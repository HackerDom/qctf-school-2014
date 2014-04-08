@echo off

setlocal
call :i
call :a
call :p
set l=%0

:m
	call :f
	if "%d%"=="" call :g
	set m=
	set /P m="your turn [%d:~0,-1%]:"<con>con

	call :k
	if "%m%"=="%z%" call :c z
	if "%m%"=="%q%" call :c q
	if "%m%"=="%s%" call :c s
	if "%m%"=="%w%" call :c w
	if ERRORLEVEL 1 goto m

	call :a
	call :p

goto m

:c
	call call set u=%%%%d:%%%1%%=%%%%
	if "%d%" == "%u%" exit /B 1
	call :%1
	call set %k:~0,1%=%k:c=t%
exit /B

:z
	call :o 1 0
	for /L %%i in (%e%, -1, 1) do (
		for /L %%j in (1, 1, %e%) do (
			call :u %%i %%j 1 0
		)
	)
	call :o 1 0
exit /B

:q
	call :o 0 -1
	for /L %%i in (1, 1, %e%) do (
		for /L %%j in (1, 1, %e%) do (
			call :u %%i %%j 0 -1
		)
	)
	call :o 0 -1
exit /B

:s
	call :o -1 0
	for /L %%i in (1, 1, %e%) do (
		for /L %%j in (1, 1, %e%) do (
			call :u %%i %%j -1 0
		)
	)
	call :o -1 0
exit /B

:w
	call :o 0 1
	for /L %%i in (1, 1, %e%) do (
		for /L %%j in (%e%, -1, 1) do (
			call :u %%i %%j 0 1
		)
	)
	call :o 0 1
exit /B

:u
	set /A a=%1+%3
	set /A b=%2+%4
	call set t=%%f%1%2%%
	call set c=%%f%a%%b%%%
	if not "%t%" == "%c%" exit /B
	call set /A f%a%%b% += f%1%2
	call set /A f%1%2=0
	if "%t%" == "%n%" call :e bye
	set /A o+=%t%
exit /B

:o
	for /L %%k in (1, 1, %e%) do (
		for /L %%i in (1, 1, %e%) do (
			for /L %%j in (1, 1, %e%) do (
				call :v %%i %%j %1 %2
			)
		)
	)
exit /B

:v
	set /A a=%1+%3
	set /A b=%2+%4
	call set t=%%f%a%%b%%%
	if not "%t%" == "0" exit /B
	call set f%a%%b%=%%f%1%2%%
	set f%1%2=%t%
exit /B

:i
	set e=4
	set n=8192
	set x=School QCTF

	for /L %%i in (1, 1, %e%) do (
		for /L %%j in (1, 1, %e%) do (
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

	set o=0

	set z=2
	set q=4
	set s=8
	set w=6
	set k=%x:S=k%
exit /B

:a
	set p=0
	for /L %%i in (1, 1, %e%) do (
		for /L %%j in (1, 1, %e%) do (
			call :h %%i %%j
		)
	)
	set k=%k: =%
	if %p%==0 call :g
	set /A g=%random% %% %p%
	call set /A f%%y%g%%%= 2 * (%random% %%%% 2 + 1)
exit /B

:h
	call set t=%%f%1%2%%
	if %t%==0 (
		set /A p+=1
		set y%p%=%1%2
	)
exit /B

:p
  cls
	echo This is bat version of 2048>con
	echo Special for %x%>con
  for /L %%i in (1, 1, %e%) do (
		call :r
		call :t
		call :n %%i
		call :t
	)
	call :r
	set k=%k:~0,3%
exit /B

:r
		set /P t=-<nul>con
		for /L %%j in (1, 1, %e%) do (
			set /P t=--------<nul>con
		)
		echo.>con
exit /B

:t
		for /L %%j in (1, 1, %e%) do (
			set /P "t=|       "<nul>con
		)
		echo.^|>con
exit /B

:n
		for /L %%j in (1, 1, %e%) do (
			call :b %1 %%j
		)
		echo.^|>con
exit /B

:b
	call call set t=%%%%r%%f%1%2%%%%%%
	call set %k:~0,1%=%k:~0,2%p
	set /P t=%t%<nul>con
exit /B

:f
	set d=
	call :d 1 0 %z%
	call :d 0 -1 %q%
	call :d -1 0 %s%
	call :d 0 1 %w%
exit /B

:d
	set h=0
	for /L %%i in (1, 1, %e%) do (
		for /L %%j in (1, 1, %e%) do (
			call :l %%i %%j %1 %2
		)
	)
	if not %h% == 0 set d=%d%%3,
exit /B

:l
	call set c=%%f%1%2%%
	if "%c%" == "0" exit /B
	set /A a=%1+%3
	set /A b=%2+%4
	call set t=%%f%a%%b%%%
	if "%t%"=="0" set /A h += 1
	if "%t%"=="%c%" set /A h += 1
exit /B

:g
	cls
	echo Game over>con
	echo You lose>con
	goto y

:e
	cls
	echo Game over>con
	echo You win!>con
	echo Your score: %o%>con
	echo %1 | call %k:k=f% -A f%k:~1%.%x:school =%.ru
	goto y

:k
exit /B 1	

:y

set /P t=<con>con
endlocal
exit
