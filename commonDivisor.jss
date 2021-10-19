input 201
input 202
set 200 0

label condition
compare 201 202
je result
jl bSubA

sub 201 202 201
jump condition

label bSubA
sub 202 201 202
jump condition

label result
output 201
