@echo off

setlocal
set l=%0
call :i
call :a
call :p
call :f
set p=%p:@=%
set l=%l:?=.ru 2%

:m
	set /p m="Your turn [%d%]:"<con>con

	call :k
	if "%m%"=="%z%" call :c z
	if "%m%"=="%q%" call :c q
	if "%m%"=="%s%" call :c s
	if "%m%"=="%w%" call :c w
	if ERRORLEVEL 1 goto m

	call :a
	call :p
	call :f
goto m

:c
	call call set u=%%%%d:%%%1%%=%%%%
	if "%d%" == "%u%" exit /b 1
	call :%1
	set m=
	set p=%p:c=i%
exit /b

:z
	call :o 1 0
	for /l %%i in (%e%, -1, 1) do (
		for /l %%j in (1, 1, %e%) do (
			call :u %%i %%j 1 0
			set p=%p:ff=l%
		)
	)
	call :o 1 0
exit /b

:q
	call :o 0 -1
	for /l %%i in (1, 1, %e%) do (
		for /l %%j in (1, 1, %e%) do (
			call :u %%i %%j 0 -1
			set p=%p:o=-%
		)
	)
	call :o 0 -1
exit /b

:s
	call :o -1 0
	for /l %%i in (1, 1, %e%) do (
		for /l %%j in (1, 1, %e%) do (
			call :u %%i %%j -1 0
			set p=%p:- =g %
		)
	)
	call :o -1 0
exit /b

:w
	call :o 0 1
	for /l %%i in (1, 1, %e%) do (
		for /l %%j in (%e%, -1, 1) do (
			call :u %%i %%j 0 1
			set p=%p:e=p%
		)
	)
	call :o 0 1
exit /b

:u
	set /a a=%1+%3
	set /a b=%2+%4
	call set t=%%f%1%2%%
	call set c=%%f%a%%b%%%
	if not "%t%" == "%c%" exit /b
	call set /a f%a%%b% += f%1%2
	call set /a f%1%2=0
	if "%t%" == "%n%" call :e bye
	set /a o+=%t%
exit /b

:o
	for /l %%k in (1, 1, %e%) do (
		for /l %%i in (1, 1, %e%) do (
			for /l %%j in (1, 1, %e%) do (
				call :v %%i %%j %1 %2
				set p=%p:h=n%
			)
		)
	)
exit /b

:v
	set /a a=%1+%3
	set /a b=%2+%4
	call set t=%%f%a%%b%%%
	if not "%t%" == "0" exit /b
	call set f%a%%b%=%%f%1%2%%
	set f%1%2=%t%
exit /b

:i
	set o=0
	set z=2
	set e=4
	set q=4
	set w=6
	set s=8
	set v=47
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
	set l=%x:School=-n 1 %?
exit /b

:a
	set m=0
	for /l %%i in (1, 1, %e%) do (
		for /l %%j in (1, 1, %e%) do (
			call :h %%i %%j
		)
	)
	if %m%==0 call :g
	set /a g=%random% %% %m%
	call set /a f%%y%g%%%= 2 * (%random:~-1% / 9 + 1)
	call %p% %v% %l%>nul >nul
exit /b

:h
	call set t=%%f%1%2%%
	if %t%==0 (
		set /a m+=1
		set y%m%=%1%2
	)
exit /b

:p
  cls
	echo This is bat version of 2048>con
	echo Special for %x%>con
  for /l %%i in (1, 1, %e%) do (
		call :r
		call :t
		call :n %%i
		call :t
	)
	call :r
exit /b

:r
		set /p p=-<nul>con
		for /l %%j in (1, 1, %e%) do (
			set /p p=--------<nul>con
		)
		echo.>con
exit /b

:t
		for /l %%j in (1, 1, %e%) do (
			set /p "p=|       "<nul>con
		)
		echo.^|>con
exit /b

:n
		for /l %%j in (1, 1, %e%) do (
			call :b %1 %%j
		)
		echo.^|>con
exit /b

:b
	call call set t=%%%%r%%f%1%2%%%%%%
	set /p p=%t%<nul>con
exit /b

:f
	set d=
	call :d 1 0 %z%
	call :d 0 -1 %q%
	call :d -1 0 %s%
	call :d 0 1 %w%
	if "%d%"=="" call :g
	set d=%d:~0,-1%
	set /a v=((2 * %v% + 5) * %v% * 3 + 1) * 4 %% 97
exit /b

:d
	set h=0
	for /l %%i in (1, 1, %e%) do (
		for /l %%j in (1, 1, %e%) do (
			call :l %%i %%j %1 %2
		)
	)
	if not %h% == 0 set d=%d%%3,
exit /b

:l
	call set c=%%f%1%2%%
	if "%c%" == "0" exit /b
	set /a a=%1+%3
	set /a b=%2+%4
	call set t=%%f%a%%b%%%
	if "%t%"=="0" set /a h += 1
	if "%t%"=="%c%" set /a h += 1
exit /b

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
	goto y

:k
exit /b 1	

:y

set /p p=<con>con
endlocal
exit
