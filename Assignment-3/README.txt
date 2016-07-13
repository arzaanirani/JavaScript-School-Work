readme.txt

====================
Authors:
====================
Charles Jonathan Bimm (100972986)
Arzaan Irani (100826631)
====================

Files Included:

COMP2406A-A3/
    |--Furnace.js
    |--Thermostat.js
    |--package.json
    |--readme.txt
    |--security/
        |--servercert.crt
        |--serverkey.pem
        |--clientcert.crt
        |--clientkey.pem
    |--html/
        |--facivon.ico
        |--index.html
        |--jquery-1.11.3.js
        |--main.js
        |--styles.css


========================
Browser Based Thermostat
========================

The program was developed on Windows using the Chrome Browser Environment and 
on Mac using the Safari Browser Environment. The program can be run by using 
'node Thermostat.js' command in the terminal first, followed by the 'node 
Furnace.js' command in a seperate terminal window. The directory where the 
commands should be executed in the terminal is the directory where the files 
are located. The server runs on 'https://127.0.0.1:3000'. 

This program is meant to emulate an "Internet of Things" style connection
between a browser and a server. Specifically, the browser connects to a 
Thermostat server, which itself controls a Furnace. There is also the addition
of access to a Weather Service, which is used to display current weather 
conditions on the browser (helps in the adjustment of the Thermostat). 

The Thermostat and Furnace connection represents a server client connection 
where the Thermostat is the server and the client is the Furnance. This 
connection is implemented with a secure connection (https), where the 
Thermostat and the Furnance each have their own certificates and security keys.

When the network is running, the Furnace sends requests to the Thermostat, 
then the Thermostat sends a response to the Furnace. The Furnace increases the 
current temperature where the Thermostat imaginarily resides if the Thermostat 
sends the signal that the Furnace should be ON. Then the Thermostat is updated 
with the new information from the Furnace. If the current temperature of the 
imaginary space gets higher than the desired temperature of the Thermostat, 
the Thermostat sends a signal to shut the Furnace OFF. The Furnace sends the 
requests (POST requests) to the Thermostat every five seconds, so that it can
check if it needs to change states.

The heating of the Furnace is done on a timer, so that it more closely 
resembles real life. For example, if the Thermostat sends a signal to the 
Furnace to turn on, then the Furnace will increase the current temperature 
every four seconds. This way the temperature increases independently of the 
Thermostat, and the Thermostat must react to the temperature increased by the 
Furnace, which may change several degrees from the previous request. 
Additionally, the Thermostat uses Hysteresis by only turning on if the current 
temperature is one degree or more below the desired temperature. Therefore, 
the temperature will hover around the desired temperature, fluctuating a 
few degrees above or below the desired temperature in either direction at any 
given time. 

The Thermostat also talks with the Browser client through a secure connection 
(https). The browser client shows the current temperature, the desired 
temperature and the current weather. The client can update the desired 
temperature by using the Browser connection at the appropriate website. The 
Thermostat server should update the Furnace based on what is given in the 
browser while also showing the current desired temperature. The current 
temperature will update as the furnace increases the temperature and 
Thermostat is updated, and updates the browser. Additionally, the weather 
information may be updated by using the referesh button in the browser.


=================
Bugs
=================

There are no known bugs at the time of submission.

