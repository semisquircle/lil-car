# Lil' Car
A mock car widget for Dashboard on old macOS versions.\
This is a general repository for the widget featured in my [YouTube video](#).\
Icons from Noun Project.

## Versions
To maximize compatibility, two versions are available:
- *Standard Edition*
	- No sound effects
	- ECMAScript 3
	- Optimized for Mac OS X 10.4 Tiger – 10.6 Snow Leopard
- *Deluxe Edition*
	- Yes sound effects
	- ECMAScript 5
	- Optimized for Mac OS X 10.7 Lion – macOS 10.14 Mojave

## Installation
Download a compiled version on [Semipedia](https://semiopteryx.github.io/semipedia/chapters/semiware) or the [releases page](https://github.com/semiopteryx/lil-car/releases). Extract, double-click on the .wdgt file, and drag the widget to your desired location on the Dashboard. This will be stored in ~/Library/Widgets.

## Virtual Machine Instructions
If you're interested in widgets but you lack access to hardware running an old enough Mac version, I recommend VMWare Fusion or UTM for emulation on a host Mac. Apple's [Developer Support](https://support.apple.com/en-us/102662) page provides disk images for 10.7 – 10.12, and a Tiger ISO can be found pretty easily elsewhere.

Shared directories/guest additions is generally unsupported for Mac versions <10.14, so the simplest method to get the widget onto the VM is through a network connection.

1. Start the VM while connected to the internet.
2. Enable file sharing on both the guest and host (System Preferences > Sharing > File Sharing).
3. Open a new Finder window on the host and choose Go > Network.
4. Find your VM device, click on "Connect As..." and log in using the guest's admin credentials.
5. Navigate to the VM's main hard disk and copy the widget wherever you like!

Emulation on a Windows host is also possible, VirtualBox will better achieve this.

## Note
Keep in mind the Standard edition was written to be completely backwards compatible with the Safari 2.0 WebKit engine from 2005. That means no native audio support, no CSS3, and bare-bones JS helper methods. For future developers, I would recommend starting with a program like Dashcode on OS X 10.7.