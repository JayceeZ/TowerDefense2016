echo before
call npm --version
cd Server/
call npm start
cd ../Core
call npm start
cd ../TableUI
call npm start
echo after