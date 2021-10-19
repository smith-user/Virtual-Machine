set 201 1
set 200 0

input 210
set 202 1
set 203 1

compare 200 210
je result

label condition
compare 210 202
je result

add 201 202 202
mul 203 202 203
jump condition

label result
output 203
