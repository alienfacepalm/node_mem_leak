## Node Mem Leak

This project is to show a purposeful memory leak in Node and then how to fix it.

Plotting requires Python3 and matplotlib

`pip install -r requirements.txt`

# Leak and observe

1. `npm i`
2. `npm run leak` -- wait a like 15 seconds or so
3. `ctrl+c`
4. `npm run plot`
5. `npm run server`
6. Navigate browser to http://localhost:3000
7. Observe the leak, it continuously grows

# Fix

1. Open index.js in IDE
2. Uncomment line 28
3. Save
4. Repeat steps 2-7 above
5. Leak fixed, memory usage is flat

## Leaking Example

![Memory Leak](public/leak.PNG "Memory Leak")

## Fixed Leak Example

![Fixed Memory Leak](public/leak-fixed.PNG "Fixed Memory Leak")
