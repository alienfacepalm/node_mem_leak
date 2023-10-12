## Node Mem Leak

This project is to demonstrate a leak and how to fix it with proper teardown.
It is based on https://techtldr.com/simple-guide-to-finding-a-javascript-memory-leak-in-node-js/

Plotting requires Python3 and matplotlib

`pip install -r requirements.txt`

# Leak and observe

First run `npm run leak` w/out options, and finish the steps to see the leak chart.

Then run it again with the flags to see the fix.

1. `npm i`
2. `npm run leak` flags [--fixed (fix the leak), --clean (clean up the heapdump files)]
3. `ctrl+c`
4. `npm run plot`
5. `npm run server`
6. Navigate browser to http://localhost:3000
7. Observe the leak, it continuously grows

## Leaking Example

![Memory Leak](public/leak.PNG "Memory Leak")

## Fixed Leak Example

![Fixed Memory Leak](public/leak-fixed.PNG "Fixed Memory Leak")
