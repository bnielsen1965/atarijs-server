# atarijs-server

Nodejs based server to manage a set of emulated Atari floppy drives using the
atarijs-sio and atarijs-disk-image modules.

Provides a web based user interface with drag and drop image loading.

> **WARNING** This software is provided as is and does not include an warranty or
> guarantee. **Use at your own risk!** Keep backups of all floppy images that you
> may use with this software.


## hardware

Theoretically this server will run on any hardware that has a serial port. To date
it has only been tested on Raspberry Pi 3 hardware.

An Atari 8 bit computer will be required and an SIO cable or jumper wires to connect
the SIO connector on the computer to a breakout board.

**NOTE:** The Atari SIO connector utilizes +5 volts for signals while the Raspberry
Pi 3 uses +3.3 volts. A few resistors will be required to create a voltage divider
circuit to reduce the Atari voltage on the Digital Output. The Atari Digital Input
will recognize the +3.3 volts on the Raspberry Pi 3 but a current limiting resistor
is recommended.


## software

Building and installing the software will require [nodejs](https://nodejs.org/) and npm.
If the server is provided in a package pre-built then only the node executable is
required.


Theoretically the software should run on any operating system that is supported by
nodejs. However, some platforms may need to compile the nodejs serial-port module.
Development and testing was conducted on Raspian Jessie Lite operating system.


## building the server

Download a copy of the atarijs-server repository or use git to clone the repository.
Inside the atarijs-server directory run `npm install` to download all the dependencies
and compile the serial-port module if necessary.


## running the server

**NOTE: A configuration file does not yet exist, the port setting in in index.js***

Edit the server settings and define the serial port device that will be used in the
operating system to connect to the Atari computer SIO port.


In the atarijs-server directory execute `node index.js` to start the server. The
server will open the serial port connection to the Atari and a TCP port for the
web based user interface.


## using the server

Copy ATR image files into the atarijs-server/public/images/ directory.


Use a web browser and enter the address and port number of the server in the web browser
location bar.


Drag and drop files and floppy image files in the web page to move them between the file list, emulated drives
and parked image slots.


**NOTE: Floppy images in the drives are in the server memory and writes to the
floppies does not change the file on the server's drive.** Use the *Save* icon on
a drive to save the current floppy image back to the server file.
