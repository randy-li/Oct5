#!/bin/bash

docker run -it -v /Users/yunpengli/Oct5/:/opt/Oct5 -p 3000:3000 node-server nodemon /opt/Oct5/Express4/meadowlark.js
