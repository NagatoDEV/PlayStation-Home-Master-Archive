A snapshot of data from PlayStation Home at 2015-04-01, the day it was closed.
I hope this collection is useful to maintain our gaming heritage, and that
possibly some day, some will be able to walk around as a vending machine in a
future FOSS Home client.
Cannot gauge the accuracy or completeness of this collection without hard
numbers from people that would know better, but I would suggest for everything
that Home was, we have ~90% of Objects and 60% of Scenes. I want to thank
Cubehouse (Jamie Holding) of alphazone4.com whom I got in touch with on 29th
March — just a few days ago! — with my worries that I would not be able to archive
as much of Home as exists, and he provided a wealth of data (missing IDs!) that
without, this snapshot would have been around 15GiB instead.
Contribution of missing data is _very_ welcome and sought after, get in touch.
-- @johndrinkwater

You will find inside:

# Objects

Nearly every object that Home was built with inside:
scee-home.playstation.net/c.home/prod2/live2/Objects/%ID%/

Files are revisioned, with each update incrementing a number contained within
the filename, previous revisions of files are no longer used by Home (or
get-able). If they have had no modification, filenames will simply be what.ext,
whereas if they have been modified, the names will include _T### before the
file extension, zero-padded, indicating revision. %ID% is, from what I predict
a randomally assigned UUID. It doesn’t appear they started that way, with
numbers incrementing from 00000000-00000000-00000000-00000001, yet current
patterns are different enough to suggest non-namespaced IDs. Empty dirs are
probable IDs with unknown file revisions.

* object.sdat / object_T###.sdat
	This file contains all the data needed for the item: vertex, textures,
scripting and such (afaik), but they are encrypted using Sony’s signed EDAT
format. The bulk of these files are using version 4, with 11% using Version 2.4
(and just 25 files using Version 2.2).

* object.odc / object_T###.odc
	This is a description file, loaded by the GUI when you visit shops or
browse inventory. These again are encrypted, but I haven’t looked much into it.
They don’t appear to have a common header/footer format like the sdat files, so
I assume they are headless and just small encrypted blobs.

* large.png / large_T###.png
	A large thumbnail, 320×176, with solid white background. Duh.

* small.png / small_T###.png
	A small thumbnail, 128×128, with solid white background. Duh.

# Spaces

Most Spaces (or as Home refers to them internally, Scenes) inside:
scee-home.playstation.net/c.home/prod2/live2/Scenes/%ID%/

I say most, because there are (sadly) a lot of missing Scenes that should make
up this collection, Spaces such as Uncharted 2, Far Cry 2, Resident Evil 5, and
many more were lost to time. I hope that anyone that was a part of creating
Home, and is equally sad that some of the best Spaces are missing, would be
able to donate them to the collection. Empty dirs are probable IDs with unknown
file revisions - they were likely to have been removed from the CDN at the time
they left Home.


File organisation behaves similarly to Objects, with a few exceptions. Scene
description files have the extension sdc. And creators were given the chance to
customise the alphanumeric-slug that each Space uses. Possibly because they
wanted to make it hard on archivists, or whatever little memory PS3 had, they
wanted to fill it with redundant strings.

Directory names (aka Scene %ID%) are assigned in this case, kinda following a
psuedo‐namespacing scheme.

Let’s look at: /Scenes/Uncharted3_SCEA_E385_808

Inside we have uncharted3_yemen_scea as the custom name:

* uncharted3_yemen_scea_T032.sdat
	same as object.sdat

* uncharted3_yemen_scea_T032.sdc
	same as object.odc

* * large.png / large_T###.png
	A large thumbnail, 320×176. Duh.

* small.png / small_T###.png
	A small thumbnail, 128×128. Duh.

# Other crap

As well as data contained on the 3 sce*-home.playstation.net domains, there are
additional files that some of these Spaces request on load, or during play.
Textures (dds), audio and video (mp4), RSS and XML files (twitter and custom
data), a few JSON scoreboards, etc. This is probably the weakest part of the
collection, as I did not get to venture into every Space contained in this
archive; Home navigator in the EU region was solely lacking in recent months,
compared to how populated it was in 2010, 2011…)

For obvious scripts that require submitted data, I’ve stripped any uniquely
identifying data, but have left the returned data as is, for example use.
Please behave appropriately with any UGC data that may be within.

Further to that, some Stores in Spaces (like Mui Mui Crusier, I think) load
images directly from Sony CDNs, so those are included. Other included data,
such as UGC for the MIB Space, was hosted on Flickr. I took the chance to grab
higher versions of the assets, as I expect they could go when(if?) Yahoo! does.
