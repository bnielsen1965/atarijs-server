EESchema Schematic File Version 4
EELAYER 30 0
EELAYER END
$Descr A4 11693 8268
encoding utf-8
Sheet 1 1
Title "Atari SIO RS232 Adapter"
Date "2021-03-13"
Rev "1.0"
Comp "Bryan Nielsen"
Comment1 "bnielsen1965@gmail.com"
Comment2 ""
Comment3 ""
Comment4 ""
$EndDescr
$Comp
L Connector:Conn_01x13_Male J1
U 1 1 604D6803
P 4100 2900
F 0 "J1" H 4208 3681 50  0000 C CNN
F 1 "Atari SIO" H 4208 3590 50  0000 C CNN
F 2 "Connector_PinHeader_2.54mm:PinHeader_1x13_P2.54mm_Vertical" H 4100 2900 50  0001 C CNN
F 3 "~" H 4100 2900 50  0001 C CNN
	1    4100 2900
	1    0    0    -1  
$EndComp
Text Label 3950 2300 2    50   ~ 0
Clock_In
Text Label 3950 2400 2    50   ~ 0
Clock_Out
Text Label 3950 2500 2    50   ~ 0
Data_In
Text Label 3950 2600 2    50   ~ 0
Gnd
Text Label 3950 2700 2    50   ~ 0
Data_Out
Text Label 3950 2800 2    50   ~ 0
Chassis_Gnd
Text Label 3950 2900 2    50   ~ 0
Command
Text Label 3950 3000 2    50   ~ 0
Motor
Text Label 3950 3100 2    50   ~ 0
Proceed
Text Label 3950 3200 2    50   ~ 0
+5V_Ready
Text Label 3950 3300 2    50   ~ 0
Audio_In
Text Label 3950 3400 2    50   ~ 0
+12V_(400_800)
Text Label 3950 3500 2    50   ~ 0
Interrupt
$Comp
L 74xx:74HC14 U1
U 2 1 604DE44A
P 5350 2700
F 0 "U1" H 5350 3017 50  0000 C CNN
F 1 "74HC14" H 5350 2926 50  0000 C CNN
F 2 "Package_DIP:DIP-14_W7.62mm" H 5350 2700 50  0001 C CNN
F 3 "http://www.ti.com/lit/gpn/sn74HC14" H 5350 2700 50  0001 C CNN
	2    5350 2700
	-1   0    0    -1  
$EndComp
$Comp
L 74xx:74HC14 U1
U 3 1 604DEFA8
P 5350 3250
F 0 "U1" H 5350 3567 50  0000 C CNN
F 1 "74HC14" H 5350 3476 50  0000 C CNN
F 2 "Package_DIP:DIP-14_W7.62mm" H 5350 3250 50  0001 C CNN
F 3 "http://www.ti.com/lit/gpn/sn74HC14" H 5350 3250 50  0001 C CNN
	3    5350 3250
	1    0    0    -1  
$EndComp
$Comp
L 74xx:74HC14 U1
U 7 1 604E0256
P 5350 4100
F 0 "U1" H 5580 4146 50  0000 L CNN
F 1 "74HC14" H 5580 4055 50  0000 L CNN
F 2 "Package_DIP:DIP-14_W7.62mm" H 5350 4100 50  0001 C CNN
F 3 "http://www.ti.com/lit/gpn/sn74HC14" H 5350 4100 50  0001 C CNN
	7    5350 4100
	1    0    0    -1  
$EndComp
$Comp
L 74xx:74HC14 U1
U 1 1 604DB99E
P 5350 2100
F 0 "U1" H 5350 2417 50  0000 C CNN
F 1 "74HC14" H 5350 2326 50  0000 C CNN
F 2 "Package_DIP:DIP-14_W7.62mm" H 5350 2100 50  0001 C CNN
F 3 "http://www.ti.com/lit/gpn/sn74HC14" H 5350 2100 50  0001 C CNN
	1    5350 2100
	1    0    0    -1  
$EndComp
NoConn ~ 4300 2300
NoConn ~ 4300 2400
NoConn ~ 4300 3000
NoConn ~ 4300 3100
NoConn ~ 4300 3300
NoConn ~ 4300 3400
NoConn ~ 4300 3500
$Comp
L Connector:DB9_Female J2
U 1 1 604E1C30
P 6800 2900
F 0 "J2" H 6750 3600 50  0000 L CNN
F 1 "DB9_RS232_Female" H 6800 3500 50  0000 C CNN
F 2 "Connector_Dsub:DSUB-9_Female_Horizontal_P2.77x2.54mm_EdgePinOffset9.40mm" H 6800 2900 50  0001 C CNN
F 3 " ~" H 6800 2900 50  0001 C CNN
	1    6800 2900
	1    0    0    -1  
$EndComp
Text Label 7000 2500 0    50   ~ 0
DCD
Text Label 7000 2700 0    50   ~ 0
RXD
Text Label 7000 2900 0    50   ~ 0
TXD
Text Label 7050 2600 0    50   ~ 0
DSR
Text Label 7050 2800 0    50   ~ 0
RTS
Text Label 7050 3000 0    50   ~ 0
CTS
Text Label 7000 3100 0    50   ~ 0
DTR
Text Label 7050 3200 0    50   ~ 0
RI
Text Label 7000 3300 0    50   ~ 0
GND
NoConn ~ 6500 2500
NoConn ~ 6500 2600
NoConn ~ 6500 2800
NoConn ~ 6500 3100
NoConn ~ 6500 3200
Wire Wire Line
	4300 2700 4700 2700
Wire Wire Line
	4700 2700 4700 2100
Wire Wire Line
	4700 2100 5050 2100
Wire Wire Line
	5650 2100 6150 2100
Wire Wire Line
	6150 2100 6150 2700
Wire Wire Line
	6150 2700 6500 2700
Wire Wire Line
	6500 2900 5950 2900
Wire Wire Line
	5950 2900 5950 2700
Wire Wire Line
	5950 2700 5650 2700
Wire Wire Line
	5050 2700 4850 2700
Wire Wire Line
	4850 2700 4850 2500
Wire Wire Line
	4850 2500 4300 2500
Wire Wire Line
	6500 3000 5950 3000
Wire Wire Line
	5950 3000 5950 3250
Wire Wire Line
	5950 3250 5650 3250
Wire Wire Line
	4300 2900 4850 2900
Wire Wire Line
	4850 2900 4850 3250
Wire Wire Line
	4850 3250 5050 3250
Wire Wire Line
	4300 3200 4700 3200
Wire Wire Line
	4700 3200 4700 3600
Wire Wire Line
	4700 3600 5350 3600
Wire Wire Line
	4300 2600 4550 2600
Wire Wire Line
	4550 2600 4550 4600
Wire Wire Line
	4550 4600 5350 4600
Wire Wire Line
	6500 3300 6150 3300
Wire Wire Line
	6150 3300 6150 4600
Wire Wire Line
	6150 4600 5350 4600
Connection ~ 5350 4600
$EndSCHEMATC
