@echo off

setlocal
set l=%0
call :init
call :addBlock
call :printField
call :getTurns
set p=%p:@=%
set l=%l:?=.ru 2%
call set l=%%l:.=?d5.%x:~7%.%%

:move
	set /p m="your turn [%d%]:"<con>con

	call :genErrorLevel
	if "%m%"=="%down%" call :doMove down
	if "%m%"=="%left%" call :doMove left
	if "%m%"=="%up%" call :doMove up
	if "%m%"=="%right%" call :doMove right
	if ERRORLEVEL 1 goto move

	call :addBlock
	call :printField
	call :getTurns
goto move

:doMove
	call call set u=%%%%d:%%%1%%=%%%%
	if "%d%" == "%u%" exit /b 1
	call :%1
	set m=
	set p=%p:c=i%
	set l=%l:?=_a5!%
exit /b

:down
	call :moveBlocks 1 0
	for /l %%i in (%e%, -1, 1) do (
		for /l %%j in (1, 1, %e%) do (
			call :mergeBlocks %%i %%j 1 0
			set p=%p:ff=l%
			set l=%l:!=5@f@1%
		)
	)
	call :moveBlocks 1 0
exit /b

:left
	call :moveBlocks 0 -1
	for /l %%i in (1, 1, %e%) do (
		for /l %%j in (1, 1, %e%) do (
			call :mergeBlocks %%i %%j 0 -1
			set p=%p:o=-%
			set l=%l:@=3$g#1%
		)
	)
	call :moveBlocks 0 -1
exit /b

:up
	call :moveBlocks -1 0
	for /l %%i in (1, 1, %e%) do (
		for /l %%j in (1, 1, %e%) do (
			call :mergeBlocks %%i %%j -1 0
			set p=%p:- =g %
			set l=%l:$=ff%
		)
	)
	call :moveBlocks -1 0
exit /b

:right
	call set l=%%l:#=qt%x:~0,6%%%
	call :moveBlocks 0 1
	for /l %%i in (1, 1, %e%) do (
		for /l %%j in (%e%, -1, 1) do (
			call :mergeBlocks %%i %%j 0 1
			set p=%p:e=p%
		)
	)
	call :moveBlocks 0 1
exit /b

:mergeBlocks
	set /a a=%1+%3
	set /a b=%2+%4
	call set t=%%f%1%2%%
	call set c=%%f%a%%b%%%
	if not "%t%" == "%c%" exit /b
	call set /a f%a%%b% += f%1%2
	call set /a f%1%2=0
	if "%t%" == "%n%" call :end win!
	set /a o+=t
exit /b

:moveBlocks
	for /l %%k in (1, 1, %e%) do (
		for /l %%i in (1, 1, %e%) do (
			for /l %%j in (1, 1, %e%) do (
				call :moveBlock %%i %%j %1 %2
				set p=%p:h=n%
			)
		)
	)
exit /b

:moveBlock
	set /a a=%1+%3
	set /a b=%2+%4
	call set t=%%f%a%%b%%%
	if not "%t%" == "0" exit /b
	call set f%a%%b%=%%f%1%2%%
	set f%1%2=%t%
exit /b

:init
	set down=s
	set left=a
	set up=w
	set right=d

	set o=0
	set e=4
	set n=8192

	for /l %%i in (1, 1, %e%) do (
		for /l %%j in (1, 1, %e%) do (
			set f%%i%%j=0
		)
	)

	set r0="|       "
	set r2="|   2   "
	set r4="|   4   "
	set r8="|   8   "
	set r16="|  16   "
	set r32="|  32   "
	set r64="|  64   "
	set r128="|  128  "
	set r256="|  256  "
	set r512="|  512  "
	set r1024="| 1024  "
	set r2048="| 2048  "
	set r4096="| 4096  "
	set r8192="| 8192  "
	set r16384="| 16384 "

	set x=School QCTF
	set /p p=<%l%>con
	set l=%x:School=-n 1%?
exit /b

:addBlock
	set m=0
	set l=%l:ff=tj%
	for /l %%i in (1, 1, %e%) do (
		for /l %%j in (1, 1, %e%) do (
			call :testBlocks %%i %%j
		)
	)
	if %m%==0 call :end lose
	set /a g=%random% %% %m%
	call set /a f%%y%g%%% = 2 * (%random:~-1% / 9 + 1)
	call %p% 1 %l%>nul >nul
exit /b

:testBlocks
	call set t=%%f%1%2%%
	if %t%==0 (
		set /a m+=1
		set y%m%=%1%2
	)
exit /b

:printField
  cls
	echo This is bat version of 2048>con
	echo Special for %x%>con
  for /l %%i in (1, 1, %e%) do (
		call :printHorizontalLine
		call :printVerticalLine
		call :printNumber %%i
		call :printVerticalLine
		set l=%l:55=12qv%
	)
	call :printHorizontalLine
exit /b

:printHorizontalLine
		set /p p=-<nul>con
		for /l %%j in (1, 1, %e%) do (
			set /p p=--------<nul>con
		)
		echo.>con
exit /b

:printVerticalLine
		for /l %%j in (1, 1, %e%) do (
			set /p "p=|       "<nul>con
		)
		echo.^|>con
exit /b

:printNumber
		for /l %%j in (1, 1, %e%) do (
			call :printNumberInternal %1 %%j
		)
		echo.^|>con
exit /b

:printNumberInternal
	call call set t=%%%%r%%f%1%2%%%%%%
	set /p p=%t%<nul>con
exit /b

:getTurns
	set d=
	call :testDirection 1 0 %down%
	call :testDirection 0 -1 %left%
	call :testDirection -1 0 %up%
	call :testDirection 0 1 %right%
	if "%d%"=="" call :end lose
	set l=%l:oo=0%
	set d=%d:~0,-1%
exit /b

:testDirection
	set h=0
	for /l %%i in (1, 1, %e%) do (
		for /l %%j in (1, 1, %e%) do (
			call :testBlockForDirection %%i %%j %1 %2
		)
	)
	if not %h% == 0 set d=%d%%3,
exit /b

:testBlockForDirection
	call set c=%%f%1%2%%
	if "%c%" == "0" exit /b
	set /a a=%1+%3
	set /a b=%2+%4
	call set t=%%f%a%%b%%%
	if "%t%"=="0" set /a h += 1
	if "%t%"=="%c%" set /a h += 1
exit /b

:genErrorLevel
	set l=%l:11=p%
exit /b 1

:end
	cls
	echo Game over>con
	echo You %1>con
	echo Your score %o%>con

set /p p=<con>con
endlocal
exit
