---
# Just change title to character name, should match filename, and all data
# fields will pull from adventurers.csv, skills.csv, and image folder. 
#
# Note image files are all lowercase, and are expected as:
# name-class.jpg, name-altform.jpg, name-requestform-class.jpg
#
# Free text can still be added to any section, reviews at end, etc.


   title: Alice
---

{% set chardata = pd_read_csv('../data/adventurers.csv', 
   index_col='Name').fillna("").loc[title] %}

# {{title}}  
## Basic Info:  
**Rarity**: {{ chardata['Rarity'] }}  
**Race**: {{ chardata['Race'] }}  
**Gender**: {{ chardata['Gender'] }}  
**Type**: {{ chardata['Type'] }}  
**Personality**: {{ chardata['Personality'] }}  
**Starting Class**: {{ chardata['Primary Class'] }}  
{%if chardata['Secondary Class'] %}**Class Change**: {{ chardata['Secondary Class'] }}{% endif %}  
{%if chardata['Alternate Style'] %}**Alternate Style**: {{ chardata['Alternate Style'] }}{% endif %}  


## Base Traits  
<div class="nofilter-table nosort-table char-traits-table" markdown>
{{ populate_quicklist(file='adventurers.csv', return_columns=['Strength','IQ','Piety','Vitality','Dexterity','Speed','Luck'], filter_column="Name",filter_values=[title]) | convert_to_md_table }}  
</div>


??? info "Portraits"
    === "{{chardata['Primary Class']}}"
        ![](../img/{{title | lower }}-{{chardata['Primary Class'] | lower}}.jpg)

    === "{{chardata['Secondary Class']}}"
        ![](../img/{{title | lower }}-{{chardata['Secondary Class'] | lower}}.jpg)

    === "{{chardata['Primary Class']}} - Personal Request - Light"
        ![](../img/{{title | lower }}-{{chardata['Primary Class'] | lower}}-personal-request-light.jpg)

    === "{{chardata['Secondary Class']}} - Personal Request - Light"
        ![](../img/{{title | lower }}-{{chardata['Secondary Class'] | lower}}-personal-request-light.jpg)

    === "{{chardata['Primary Class']}} - Personal Request - Dark"
        ![](../img/{{title | lower }}-{{chardata['Primary Class'] | lower}}-personal-request-dark.jpg)

    === "{{chardata['Secondary Class']}} - Personal Request - Dark"
        ![](../img/{{title | lower }}-{{chardata['Secondary Class'] | lower}}-personal-request-dark.jpg)

    === "{{chardata['Alternate Style']}}"
        ![](../img/{{title | lower }}-{{chardata['Alternate Style'].replace(" ","-") | lower}}.jpg)

## Skills
<!-- 
skills will automatically fill
extra text can be added between skills
-->

!!! info "Inheritable Skill"
    === "{{chardata['Inheritable Skill']}} (Standard)"
        {{ get_skill_description(chardata['Inheritable Skill']) }}

        !!! note "This duration extension does not extend the turn of any debuffs inflicted directly by equipment (Staff of Weakness, etc)"

        <div class = "nosort-table nofilter-table" markdown>  
        
        | Level | Turn Count Increase (self) | Cumulative Turn Count Increase (self) | Turn Count Increase (inherited) | Cumulative Turn Count Increase (inherited) |  
        |:-----:|:--------------------------:|:-------------------------------------:|:-------------------------------:|:------------------------------------------:|  
        |   1   |              1             |                   1                   |                1                |                      1                     |  
        |   2   |              0             |                   1                   |                0                |                      1                     |  
        |   3   |              1             |                   2                   |                0                |                      1                     |  
        |   4   |              0             |                   2                   |                0                |                      1                     |  
        |   5   |              1             |                   3                   |                1                |                      2                     |  
        |   6   |              0             |                   3                   |                0                |                      2                     |  
        |   7   |              1             |                   4                   |                -                |                      -                     |  

        </div>  

    === "Chaos Deified (Personal Request - Dark)"
        {{ get_skill_description("Chaos Deified") }}

        !!! note "This duration extension does not extend the turn of any debuffs inflicted directly by equipment (Staff of Weakness, etc)"

        <div class = "nosort-table nofilter-table" markdown>  
        
        | Level | Turn Count Increase (self) | Cumulative Turn Count Increase (self) | Turn Count Increase (inherited) | Cumulative Turn Count Increase (inherited) |  
        |:-----:|:--------------------------:|:-------------------------------------:|:-------------------------------:|:------------------------------------------:|  
        |   1   |              1             |                   1                   |                1                |                      1                     |  
        |   2   |              0             |                   1                   |                0                |                      1                     |  
        |   3   |              1             |                   2                   |                0                |                      1                     |  
        |   4   |              0             |                   2                   |                0                |                      1                     |  
        |   5   |              1             |                   3                   |                1                |                      2                     |  
        |   6   |              0             |                   3                   |                0                |                      2                     |  
        |   7   |              1             |                   4                   |                -                |                      -                     |  

        </div>

    === "Innocent Fanaticism (Personal Request - Light)"
        {{ get_skill_description("Innocent Fanaticism") }}

        !!! note "This duration extension does not extend the turn of any debuffs inflicted directly by equipment (Staff of Weakness, etc)"

        <div class = "nosort-table nofilter-table" markdown>  
        
        | Level | Turn Count Increase (self) | Cumulative Turn Count Increase (self) | Turn Count Increase (inherited) | Cumulative Turn Count Increase (inherited) |  
        |:-----:|:--------------------------:|:-------------------------------------:|:-------------------------------:|:------------------------------------------:|  
        |   1   |              1             |                   1                   |                1                |                      1                     |  
        |   2   |              0             |                   1                   |                0                |                      1                     |  
        |   3   |              1             |                   2                   |                0                |                      1                     |  
        |   4   |              0             |                   2                   |                0                |                      1                     |  
        |   5   |              1             |                   3                   |                1                |                      2                     |  
        |   6   |              0             |                   3                   |                0                |                      2                     |  
        |   7   |              1             |                   4                   |                -                |                      -                     |  

        </div>  

 {% if chardata['Alternate Inheritable Skill'] %}
    === "{{chardata['Alternate Inheritable Skill']}} ({{chardata['Alternate Style']}})"
        {{ get_skill_description(chardata['Alternate Inheritable Skill']) }}
 {% endif %}

{% if chardata['Potential Inherit'] %}
!!! info "Potential Inherit"
    === "{{chardata['Potential Inherit']}}"
        {{ get_skill_description(chardata['Potential Inherit']) }}
{% endif %}
       
!!! info "Unique Skill (Not Inheritable)"

    === "{{chardata['Unique Skill (Not Inheritable)']}} {% if chardata['Alternate Unique Skill (Not Inheritable)'] %}(Standard){% endif %}"
        {{ get_skill_description(chardata['Unique Skill (Not Inheritable)']) }}

        !!! note "This damage increase is approximately 10%."

 {% if chardata['Alternate Unique Skill (Not Inheritable)'] %}
    === "{{chardata['Alternate Unique Skill (Not Inheritable)']}} ({{chardata['Alternate Style']}})"
        {{ get_skill_description(chardata['Alternate Unique Skill (Not Inheritable)']) }}
 {% endif %}

!!! info "Discipline Skill"
    === "{{chardata['Discipline']}} {% if chardata['Alternate Discipline'] %}(Standard){% endif %}"
        {{ get_skill_description(chardata['Discipline']) }}

{% if chardata['Alternate Discipline'] %}
    === "{{chardata['Alternate Discipline']}} ({{chardata['Alternate Style']}})"
        {{ get_skill_description(chardata['Alternate Discipline']) }}
{% endif %}

## Adventurer Reviews

??? info "TheAxolotl's Analysis"
    
    === "Standard"

        Alice is a fantastic unit to pull, and will likely be a staple in most folks' parties for a long while. Not only is she our first Legendary priest, but both of her skills are fantastic. Increasing her buff/debuff turn count by 1 means she gets an extra turn to heal, deal damage, or apply another buff/debuff before needing to reapply the initial. Furthermore, her damage increase to a row can apply to many af our strongest damage dealers.

        Changing her class to Mage will give her a wider selection of spells, as well, making her a very well-rounded Adventurer for support or damage purposes.

        To make things even better, many other characters will benefit from Alice duplicates. Inheriting her skill on your other favorite buffers/debuffers will allow them to each provide an extra turn for their buffs/debuffs!

        The turn duration increase from her Blessing of Agora skill adds one to the counter at rank three (on Alice, rank 5 on non-Alice), so it's possible to get at least a 5-turn duration on buffs and debuffs, which adds to the strength increasing her skill through inheritence.

        If you pull Alice, she will be a fantastic addition to your team!

    === "Snow-Sleeved Maiden"

        With her new style, Alice continues to be one of the best adventurers in the game. Without drilling into everything about her kit, I'll just touch on some key things to note. First, she trades her damage boost for damage reduction, which could be a situationally better option!

        If you're a fan of Discipline, then her MP + Div is a pretty solid option.

        She also has a really neat (in theory) SP/MP restore skill. This is great, but there's a bit of an elephant in the room here. The trigger rate is abysmally low. Based on testing with sample sizes of 1000+ casts, we're looking at a ~6.5% trigger rate on Alice herself for skill level 1. When inherited to someone else, this drops to around 4.5% or so. This is so low that it falls in the territory of triggering when you don't need it and not triggering when you do. Tests of a significantly smaller sample size show skill level 7 on Alice herself at around 16%, which would put skill level 6 inherited to someone else at 10% or less. Be aware of that before you get a ton of copies to inherit around and hope to see an impact. You'll see it trigger, but likely not often enough to make it overly impactful, and possibly just often enough to be infuriated by when it triggers.

??? info "Frobro's Analysis"

    === "Standard"

        Simple but effective. It didn’t take much to be the best in slot at what she does. Optimized stat line from Water/Elf/Female and has the ideal double caster class set. The best buffer/debuffer in the game; being able to reach a turn cap that other characters cannot. A rock-solid unit when used and desirable inherit when not. 

        A passive 10% damage increase with an easily met condition for the whole row. Has access to an, as of now unreleased spell with her Secrets of Labadios just ‘cuz. An alright discipline focus with Divine Power and Magic Def; not good, not bad. The MP gains from leveling up Blessing of Agora feels like she has 3rd discipline anyway.

        You can change her into a mage (after learning all priest spells first) and sacrifice some HP/armor and gain some MP and the entire suite of mage spells, with practically no loss of healing potency.

        There isn’t much to say; this chick excels in the roles that units like her were designed to play and has some staying power with her inherit should the game ever shift to being more buff/debuff-centric.

    === "Snow-Sleeved Maiden"

        Year 2 of the game, and some things never change; Alice is still the best in slot priest. Depending on how you look at it, this Alt is either a buff to your core Alice (unlocking “D18” / Switching IVs / Adding MP refund passive) or a slight upgrade if you don’t mind the costume.

        MP + Div is a better discipline than what core Alice has going on, and once you reach discipline lvl 1 with both styles (when merged), you can use core Alice copies to level up this discipline. At a certain point in progression, you’re strong enough to blow through enemies, and the 10% damage increase passive is just overkill. A damage reduction passive is better than a damage increase that you don’t need. Because of the stage at which it activates in the damage calculation formula, it results in a greater damage reduction than I think the devs intended (I assume they aimed for 10%), which is neat.

        Speaking of “neat,” the MP/SP refund skill seems pretty good til you find out how low the proc rate is. Don’t ever expect to see this make a big impact. Seriously, a passive that was just a 2nd stack of the “Way of the Priest” effect would result in more effective MP than this skill does at max lvl.

??? info "Shiro's Analysis"

    === "Standard"

        Starting with her inheritance we have access to basically “cheat” and arguably best inheritance in the game. Having bonus one or two turn duration on any character or even up to four Alice is absurdly game changing for any buff/debuff rotation allowing things like lasting warrior battlecry enough for two FPS rotations. It’s even more impactful on priests and mages, giving them bonus free turns for any sort of healing, more consistent rotations, usage of items or additional damage. Some people seriously downplay how strong is passive that basically breaks one of game rules. Great to have lvl 1 on everyone and maxed out on Alice. You’ll be playing two different games depending if you have it or not.

        Moving to her passive. It’s lane DMG buff which is nice but I’m personally not really impressed by those whenever it’s Alice or Lana. It’s nice to min max damage and it might help but the impact isn’t that strong unless you stack multiple of them (like Milana or Madam on top of it) so in the end it’s still a solid option especially if you run Alice as mage.

        Moving to her discipline while it’s somewhat nice to have I wouldn’t even consider investing in it especially when her inheritance is so powerful. Might be a different case if we get her alternative style in future but I can’t imagine what kind of disc it would need to have to even compete with another option to use her additional copies. 

        Her class change is mage. Which is absolutely the best option available with access to more MP based spells, offensive abilities or debuffs. Especially impactful on Alice with access up to four bonus turns on everything she cast. On top of that she has the perfect setup to be a mage leaving poor Adam behind and being able to compete with Sheli having edge over the supportive part while falling in pure damage to her. 

        To sum it up Alice is an absurdly strong option for both priest and mage. And honestly? Our arguably best caster that is sometimes downplayed. She’s not only breaking game rules making some short duration buffs really strong but she’s also a great magic damage dealer thanks to being female-water-elf mage. While this game doesn’t have any “must have” characters Alice will definitely make your game way easier when you’ll invest into her. As for now we don’t have any better supportive option so go ahead and worship Agora and enjoy the easier mode of the game with the strongest caster next to Sheli.

    === "Snow-Sleeved Maiden"

        Seems like devs don’t hide who their favorite child is. Remember how Yekaterina's summer version passive had little impact because of not only physical DMG reduction (which is extremely rare against backrow) on herself with the extra condition that she needs to be in the back row? Welcome to Alice, with all DMG reduction without row conditions, for the whole row not just herself and… with some absurd values. I don’t want to throw out the exact numbers because of not understanding the whole formula… but it seems that in the end it's way more than 10%...

        Either way her discipline is better than base one (MP+DIV), her new inheritance is… questionable. And very much easy to skip. That’s one of those rare cases where a disc brings more value than inheritance. Going to her passive which is usually either overkill or just a nice way to throw up your Yuzu and whichever evil dps in backrow on base version… the alternative brings damage reduction which is overall more useful. Unless you’re one of those leviathans going for Alice + Milana combo to oneshot GWO with Yuzu. So basically it’s way better passive for most of us regular folks who don’t swipe. Especially if you have some low HP mages in the backrow who die once in a year from random GWO attack. Of course she keeps her “balanced” bonus turns on passive which still makes her BiS priest. Especially now when she hits such absurd lvls of MP that with her random triggers she’s arguably better healing bot than Marianne for auto (just use Sheli for it really).

??? info "Karkarov's Analysis"

    === "Snow-Sleeved Maiden"

        So up front warning, I am not going to discuss standard Alice... at all.  There are already plenty of reviews of her out there on this site but also on tons of others.  So what is this about?  The new Alice Alt Skin, Shrine Mainden Fru Fru Alice of course.

        So first up, the Alice Simp armada is going to be upset because she of course loses her normal form inherit.  This time she gets "Grace of the Dark One" which gives a chance upon using a mp or sp skill to regenerate up to 40 mp or sp.  PROBLEM STATEMENT: this sounds cool, except it has been tested by our loveable crew of whales in the Faster Thoughts Wiki Backrooms already.  The proc rate just isn't any good, even on Alice, at level 7 (the max) it is only activating around 15% of the time.  That means even with incredibly high level of investment this is still only going to proc a regen 1-2 times out of 10 uses.  It doesn't suck, but it isn't reliable enough to be something you really "count on".  So it is a so so skill, is what it is.  For those curious max inherit on a non Alice (level 6) is around 10ish percent give or take.

        Next up we have her Discipline...  Well this is actually good news if you ask me.  Her new Discipline Skill "Spiritual Power of the Dark One" increases MP and Divine Power.  This is versus OG Alice who is Divine Power and Magic Defense.  So slight improvement here.

        Last but not least her unique uninheritable skill also changes, no more row damage buff, instead... it's "Heretical Blessing" and reduced damage taken to everyone in the row, as long as no one in row is good alignment per usual.  It may just be be, but I honestly kind of prefer this over the normal version, often times you are putty squishier characters in the back, or if you are using a Knight they well could be back there.  That extra damage reduction may be a big deal in those cases.  I "think" it is still a match to previous Alice skill... as in 10% reduction, but I need to do more testing.  I will update this analysis if it turns out different.  This one is sadly a little trickier to test than damage skills etc.

        In the end though she is an Alt Skin... which means she can be merged with normal Alice, and merging is always good.  As it gives free trait points, and allows for extra sources to stack discipline.  Also unlike normal Alice, it is a no brainer on this one.  The inherit skill just does not have a good enough proc rate to really be worth it, it's a luxury item so to speak, not something you "need".  So it feels a lot easier to use Fru Fru Shrine Alice for discipline unlike Normie Alice.

        Also... I honestly think the character design for this alt skin just runs rings around normal Alice and is just a really nice look for her, so there is that.

        All said, I don't think throwing some pulls at her is a bad idea, especially if you are an Alice stan, and there a lot of those.  I do think the new formation skill has a little more versatility than the old one as well, simply because you generally want your big guns on the front row not the back, A4 is definitely a place where running casters more often is not a bad idea, and it plays well with the back row Knight gimmicks.


## Adventurer Pull Plans

??? note "TheAxolotl's Pull Plan"

    === "Snow-Sleeved Maiden"

        I snagged a copy for the merge. I'll likely snag a second copy for the D1 and possibly try to get a third to give to the MC, but I'm not over-investing in this one. That inheritable skill is a really cool sounding trap.

??? note "Karkarov's Pull Plan"

    === "Snow-Sleeved Maiden"

        If you use Alice in her normal form you should at least try to pull two copies of Shrine Maiden Alice, one to merge, and one to feed for that level 1 discipline on the Alt Skin.  That's what I did, and I don't really think you need to do more than that unless you want to go ham to really push the discipline.  Her skill is not super great due to the very low proc rate, so you don't need to worry about leveling that. 

## Duplicate Usage

* Inherit her skill on other buffers/debuffers you use. This is a great inherit for almost any adventurer, and extends the duration of most time-based abilities including Warrior's Battle Cry, Mental Unity, and even the Knight's three Cover skills.
* If you plan to use Alice, increasing her Discipline will increase her damage and healing.
* Save for future use.