# atarijs-server

A NodeJS based server used to emulate Atari floppy drives on the SIO interface and
provide a web based user interface for loading of floppy disk images into emulated
drives.

**WARNING:** Always make backup copies of your floppy disk images. When clicking
on the save button on a drive control the disk image in memory will overwrite the
image file on your hard drive.


# Requirements

What will you need?
- Host platform to run the server and connect to an Atari (developed and tested on linux).
- [NodeJS](https://nodejs.org) engine installed on the host platform.
- RS232 to Atari SIO adapter. See the [hardware](#hardware) below for a possible solution.
- ATR floppy images. A set of floppy disk images will be needed for the emulation.


# Install

Copy the project from github, then use *npm install* in the project directory to
load all the dependencies.

```shell
git clone https://github.com/bnielsen1965/atarijs-server.git
cd atarijs-server
npm install
```

Next edit the config.js file and set the *SerialDevice* value to your RS232 device
that is connected to the Atari SIO interface.

Copy your floppy disk image files into the */atarijs-server/public/images* directory
where they will be hosted by the server.

And finally use node to start the atarijs-server server.
> node index.js

You can now open up the web interface in a web browser by entering the address and
port to the host server. I.E. if the atarijs server is running on the same system
as the web browser then enter [http://localhost:8080/](http://localhost:8080/) in
the web browser, or if you atarijs server is on a remote host then use the ip address
of the host, I.E. [http://192.168.0.18:8080](http://192.168.0.18:8080).


# User Interface

The user interface is a simple web page with a list of emulated floppy drives
on the left and a list of floppy disk image files on the right.

Drag a floppy disk image from the list on the right to input field on an
emulated drive on the left and the server will load that image into the
emulated drive.

![screenshot](public/img/atarijs-ss.png?raw=true "screenshot")

If additional image files are added to the */atarijs-server/public/images*
folder then the list of floppy disk images can be refreshed by clicking the
refresh icon in the upper right corner.

If changes are made to the disk in an emulated drive those changes can be
saved back to the image file by clicking on the *save disk* icon in the
emulated drive controls.

The image in an emulated drive can be ejected by clicking on the *eject* icon
on the drives controls.

**WARNING:** If changes are made to a floppy and it is ejected before saving
then the changes will be lost.


# Hardware

The atarijs-server should theoretically work with any RS232 to Atari SIO
adapter. The following is the hardware solution that was used during
development of atarijs-server.

**WARNING:** Use this hardware design at your own risk. The RS232 standard
specifies voltages that may range +/- 15VDC and depending on the RS232
hardware used you could damage your Atari computer or peripherals.

This circuit is used with the CableCreation USB to RS232 Adapter (FTDI
Chipset). A 74HC14 hex inverting Schmitt trigger is used to convert between
the 0 to 5 VDC signals on the Atari SIO and the RS232 voltages from the
RS232 adapter.

![schematic](public/img/schematic.png?raw=true "schematic")

The +5 VDC Ready signal from the Atari SIO is used to power the 74HC14 chip
and three of the hex inverter Schmitt trigger gates are used to connect the
Atar SIO Data Out to RS232 RxD, SIO Data In to RS232 TxD, and SIO Command
to RS232 CTS.

![pcb](public/img/pcb.png?raw=true "pcb")
