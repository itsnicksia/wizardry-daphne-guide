# Dungeon Map Variations  
Many dungeon maps in the abyss, events, and other locations do not have a completely fixed layout.  Players often report confusion that their maps, or the locations of events, items, etc., do not match what may be shown on different guide pages. Thankfully, it turns out these maps are not random (at least so far, which is everything through Abyss 3), they are 'tiled'. While some of those tiles can move, key events/items/people on those tiles always occur in the same relative location on those tiles in their new position.  

!!! note "HELP I CAN'T FIND XYZ!"
    If you can't find something because your map is different from what you see in the guide: Look for features based on the tile moves described below.  We have tried to have location references either include a map or coordinates that relate to the main map shown on any of the dungeon map pages. Rooms are always the same shape, chests are always in the same spots in those rooms, they just moved. <em>But they are probably there.</em>

<em>The discussion below focuses on examples in the Beginning Abyss, but so far applies to all other maps with tile variations.</em>

## Map Resetting  
Certain events and player actions can 'reset' dungeon maps which may change map layouts that were you previously explored. For example, Cursed Wheel leaping back to "Awakening" will reset the Beginning Abyss dungeon and layout. Below you see the Beginning Abyss map B1F as it might appear after having fully explored the map but then 'resetting' it and then entering by the Harken.  

Notice that all explored areas get a 'fog of war' effect that disappears when it re-enters your field of view (like the Harken Room shown), but also there are several areas 'blanked out' that will need to be reexplored anew, with each square being 'unexplored' until you step on that spot. The blank areas indicate variable map areas that <em>might</em> change layout on any reset, and where you may see differences between our maps and what you see in your game.

Take note in particular that most maps can be neatly sliced into a set of nine tiles that divide the map and clearly show boundaries around tiles that can change. (It's possible that all maps may not be 3x3.)

![](./img/variable-map-b1f-grid.jpg)  

## Map tiling behavior and movement  
Below, the tiles highlighted in blue are fixed tiles.  For most maps, most main story material occurs in these areas.  Any complicted dungeon effects often occur there as well (e.g., 2nd abyss waterways), as one would imagine the significantly increased design complexity of having those effects follow changing layouts.  The remaining tiles are the variable tiles.

![](.img/variable-map-b1f-fixed.jpg)  

These tiles can move, rotate, and possibly flip in the different positions.  Below see the same tileset in three different configurations, with each tile colored so you can see how they moved.

=== "B1F Variation A"  
    ![](./img/variable-map-b1f-var-a.jpg)  
    
=== "B1F Variation B"  
    ![](./img/variable-map-b1f-var-b.jpg)  
    
=== "B1F Variation C"  
    ![](./img/variable-map-b1f-var-c.jpg)  

## Effects on events, items, and NPC location  
Items, NPCs, and quest objectives located within these variable tiles <em>will always appear at the same place within the tile</em> regardless of its placement and rotation within the full map.

Example: With the Chris the Considerate bondmate quest the location of the objective is always located in the green highlighted tile above. In the new location, the same objective is located in the same relative location on the green tile on the left and rotated counterclockwise. These two positions are shown in the variations below:

=== "Event - Map Variation A"  
    ![](./img/variable-map-b1f-event-a.jpg)  
    
=== "Event - Map Variation B"  
    ![](./img/variable-map-b1f-event-b.jpg)  

## Beginning Abyss Variable Tiles
Below are maps of the five floors in the Beginning Abyss that have tile variations, highlighting the variable tiles. 

=== "Abyss 1 B1F"  
    ![](./img/variable-map-b1f-moveable-tiles.jpg)  
    
=== "Abyss 1 B3F"  
    ![](./img/variable-map-b3f-moveable-tiles.jpg)  
    
=== "Abyss 1 B4F"  
    ![](./img/variable-map-b4f-moveable-tiles.jpg)  

=== "Abyss 1 B6F"  
    ![](./img/variable-map-b6f-moveable-tiles.jpg)  

=== "Abyss 1 B7F"  
    ![](./img/variable-map-b7f-moveable-tiles.jpg)  

Take note of a couple things:  
1. Floor 6 breaks the rules. It only has a single 'movable' tile, and as the [Beginning Abyss maps page](../abyss-guides/1-beginning-abyss
/maps.md) shows, that one tile just flips horizontally to introduce variability to the teleporter maze. And it's only a partial tile. This is unique and hasn't been seen on any other maps, which follow the full tile behavior described above.
2. There is not a full factorial count of combinations for all floors.  For B1F, 3 tiles with 4 rotations and 2 mirror inversions each would be 2^3 4^3 x 3! = 3,072 combinations.) But all tiles cannot move to all possible positions and still make a valid map. Hallways must connect, rooms must be accessible, etc. Still, this guide will make no attempt to identify and map all actual combinations becasue the actual number can still be quite unwieldy.  The guide developers want time to play the game too, and showing a copy of every map is not needed to <em>guide</em> players through the game. 

## Credits:
Many thanks to @Chartreuse on the [Community Discord](https://discord.com/channels/1296602475918524507/1311222683144556554) for laying this all out only a month after launch.  Apologies it took so long to get this up here for wider visibility!
