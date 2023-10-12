"use strict";
import * as fs from "fs";
import * as path from "path";
import * as heapdump from "heapdump";

const leakyData = [];
const nonLeakyData = [];

const stats = [];
const fixed = !!process.argv.find((arg) => arg === "--fixed");
const clean = !!process.argv.find((arg) => arg === "--clean");

fixed && console.log("Running in FIX mode");

if (clean) {
  console.log("Cleaning heapdump files...");
  const dir = "./";
  fs.readdir(dir, (error, files) => {
    if (error) throw error;
    for (const file of files) {
      if (file.startsWith("heapdump-")) {
        fs.unlink(path.join(dir, file), (error) => {
          if (error) throw error;
        });
      }
    }
  });
}

!fixed &&
  !clean &&
  console.log(
    "No flags passed, running the leak. \n(make sure if you pass flags to add the '--' prior to the flag \ne.g. `npm run leak -- --fixed`)\n"
  );

class RandomData {
  constructor(text) {
    this.text = text;
  }
}

function cleanUpData(dataStore, randomObject) {
  const objectIndex = dataStore.indexOf(randomObject);
  dataStore.splice(objectIndex, 1);
}

function getAndStoreRandomData() {
  const randomData = Math.random().toString();
  const randomObject = new RandomData(randomData);

  leakyData.push(randomObject);
  nonLeakyData.push(randomObject);

  fixed && cleanUpData(leakyData, randomObject);
  cleanUpData(nonLeakyData, randomObject);
}

function generateHeapDumpAndStats() {
  //1. Force garbage collection every time this function is called
  try {
    global.gc();
  } catch (e) {
    console.log(
      "You must run program with 'node --expose-gc index.js' or 'npm start'"
    );
    process.exit();
  }

  //2. Output Heap stats
  const heapUsed = process.memoryUsage().heapUsed;
  stats.push(heapUsed);
  console.log("Program is using " + heapUsed + " bytes of Heap.");

  //3. Get Heap dump
  process.kill(process.pid, "SIGUSR2");
}

//Kick off the program
setInterval(getAndStoreRandomData, 5); //Add random data every 5 milliseconds
setInterval(generateHeapDumpAndStats, 2000); //Do garbage collection and heap dump every 2 seconds

//On ctrl+c save the stats and exit
process.on("SIGINT", function () {
  const data = JSON.stringify(stats);
  fs.writeFile("stats.json", data, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("\nSaved stats to stats.json");
    }
    process.exit();
  });
});
