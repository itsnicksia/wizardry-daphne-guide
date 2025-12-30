---
# Just change title to character name, should match filename, and all data
# fields will pull from adventurers.csv, skills.csv, and image folder. 
#
# Note image files are all lowercase, and are expected as:
# name-class.jpg, name-altform.jpg, name-requestform-class.jpg
#
# Free text can still be added to any section, reviews at end, etc.


   title: Yrsa
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
{% if chardata['Secondary Class'] %}
    === "{{chardata['Secondary Class']}}"
        ![](../img/{{title | lower }}-{{chardata['Secondary Class'] | lower}}.jpg)
{% endif %}
 
{% if chardata['Personal Request'] %}
    === "{{chardata['Primary Class']}} after Personal Request"
        ![](../img/{{title | lower }}-{{chardata['Primary Class'] | lower}}-personal-request.jpg)
  {% if chardata['Secondary Class'] %}
    === "{{chardata['Secondary Class']}} after Personal Request"
        ![](../img/{{title | lower }}-{{chardata['Secondary Class'] | lower}}-personal-request.jpg)
  {% endif %}
{% endif %}

{% if chardata['Alternate Style'] %}
    === "{{chardata['Alternate Style']}}"
        ![](../img/{{title | lower }}-{{chardata['Alternate Style'].replace(" ","-") | lower}}.jpg)
{% endif %}

## Skills
<!-- 
skills will automatically fill
extra text can be added between skills
-->

!!! info "Inheritable Skill"
    === "{{chardata['Inheritable Skill']}} {% if chardata['Alternate Inheritable Skill'] %}(Standard){% endif %}"
        {{ get_skill_description(chardata['Inheritable Skill']) }}

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

    Before I jump into Yrsa kit, for those that don't know, Rangers have an effective attack power of `(AttackPower * 0.5) + (Accuracy * 1.5)`. This means that if you're trying to load your Yrsa up with a bunch of Attack Power gear, her performance will be pretty bad. She needs all those ACC/ACC% gear pieces that you've been extracting in order to be able to put out solid numbers. Don't make the mistake assuming she's a bad adventurer because you didn't gear here properly.

    That being said, let's jump into her kit! While I won't touch on the Ranger kit in general, I will call out a few synergistic things with respect to what she's bringing.

    First, regarding her passive, Slayer of the White Calamaty, we've seen how good this can be on Abenius and Benjamin. We face a lot of magical beasts, so having a damage bonus there is great. This passive has an added additional bonus, that's mostly a bit gimmicky but can be situationally useful. If you happen to enter battle with a trapped enemy, the additional magical beast damage extends to another adventurer.

    First Arrow to Draw Blood is...interesting. Remember how Savia got released and was broken in a bad way until the devs released an update that fixed a bunch of things? Yeah, here's a bit of deja-vu.

    Conceptually, I like this skill a lot - based on how it reads, it provides a single target BATILGREF-like debuff to an enemy, which is neat. Furthermore, this debuff is treated like an ailment and is not subject to the 3 debuff limit, which is excellent! In addition to that, it provides some supplemental damage once it expires. For folks who look at this skill and try to compare it to an active damage skill, you'll likely be disappointed. The best way to think about this skill is as a debuff that provides damage and not as a damage skill that provides a debuff.

    The mechanics of this skill are interesting - it essentially has different "tiers" that provide gradually increasing amounts of damage upon expiration based on the number of hits an enemy receives while the debuff is up. The tiers are represented by different colors, and the color changes after a specific number of hits is received.

    1. White (16 hits)
    2. Pink (8 hits)
    3. Red (16 hits)
    4. Dark Red (8 hits)
    5. Glowing Red (16 hits)
    6. Gold (8 hits)
    7. Green (? hits)

    From here, it can proceed to blues and purples, but I'm not entirely sure how many total tiers there are or the sequence after Green. This skill has some nice synergy with Ninja parties. Ninjas getting access to Shedding allow them to take actions very frequently, and while dual wielding, basic attack and skills like Covert Strike and Yuzu's Hue can provide a large volume of hits to ramp First Arrow up.

    Here are the big downsides. First, it takes a lot of hits to increase the level. If you're looking to get to Green, for example, it'll take a total of 73 hits. That's a lot in two enemy turns, which means you also need to be using Delay Attack or Chronostasis to delay the enemy on top of likely stacking BATILGREF, as well. Why do we also need BATILGREF, you might ask? Well, remember how I alluded to there being a bug? Unfortunately, it appears as though the Attack Speed reduction portion of First Arrow does not work at all. This has been tested repeatedly and right now, it seems like applying First Arrow does not slow the enemy down the way it should. Hopefully this gets fixed, as it's a crucial element of this skill even being viable.

    In addition, folks have reported (although I haven't tested it myself) that Blessing of Agora does not extend the duration of First Arrow at all.

    Lastly, First Arrow really isn't a skill that you'd want to inherit to someone else. The inheritance damage loss will lead to a lower payoff for the large amount of work it takes to increase that damage tier.

    Her Discipline skill, Forest-Reading Huntcraft, boosts SP if you like that kind of thing.

    So, with these things in mind, I'm going to be an optimist and assume that First Arrow will be getting fixed soon. In that case, Yrsa makes a pretty solid teammate for Ninja-heavy teams. She wants parties that take multiple actions quickly, and she wants each of those actions to provide multiple hits. That being said, you don't really want to built a team around her, as the effort it takes to get First Arrow to high tiers is quite high in itself - you're likely better off using it and getting to whatever multiplier you get while taking reasonable actions, as that will give you some respectable bonus damage.

    Over all, Yrsa has a unique kit, an annoying bug, and will not be a fit for many teams. She's nothing game-breaking and is an easy skip if you're not a fan. You won't really want to run her on a party full of 2h Fighters since the number of hits you'll be able to deal in a 2 turn window is pretty limited. That being said, she has the potential to be a solid addition to faster, Ninja and Shedding-based teams. When fixed, First Arrow will hopefully have a nice spot in her skill rotation as a debuff with supplemental damage associated with it.

??? info "Karkarov's Analysis"

    MAJOR NOTE UP FRONT: Ranger is unique as a physical DPS class because due to how it's damage split works from the skill "Sniper" they derive more damage from Accuracy than they do from Attack Power.  As a result, the ideal boost/IV and BP spend if all you care about is DPS is Dexterity, not Strength.  This is different from basically every other physical DPS class, even on Samurai the other split damage formula physical DPS class Strangth and IQ are basically equal.  
    
    So without further ado, at long last a female Dorf has been added to Daphne, and she has a cute santa like cap too.  *insert LET'S GOOOOOO type meme here*

    So the question is... Is Ranger a good new class?  Is Yrsa actually a good character (why yes, by alignment for sure)? Should I spend my hard earned gem roll on these bones or save for the apocolypse? Well that is really going to come down to a you sort of thing.  Let's discuss why that is exactly.

    Ranger as a class is interesting because it is very focussed on two roles, and while one is very commonly used it is sort of non traditional to be focussed on it.  What are these roles you ask?  They are Exploration/Map clearing .... especially mapes with traps, and everyones favorite thing to do Auto Farming.  Ranger brings really nice kit to auto farming you see... they have a respectable damage aoe physical attack with Wide Volley, like all physical attacks it can also surety normally.  They have a Huehuehuehue light that can hit up to 5 times on random targets with Scatter Shot, just never use it single target as when it hits the same target it's dps falls off a cliff.  Penetrating Shot is actually a fantastic damage skill, especially when enemies are lined up back to back in a row.  Anticipated Shot is also a nice defense pen, can't generall miss, increased surety, and guaranteed surety skill if the enemy does something stupid like a "Build up" move.  Ok ok, sounds great lots of physical aoe options and a cool defense pen shot too.... so why auto farming specifically?

    Well cause none of these skills are going to hold a candle on single target damage vs say the previously mentioned Huehuehue, or the new fighter skills like Poised All Out Attack, and are generally not the most SP effecient attacks out there either.  It doesn't help that Yrsa's unqiue inherit skill "First Arrow to Draw Blood" does kinda mediocre damage, applies a pretty so so speed debuff, and even if you unload on an enemy hit with it, and they survive two rounds... her follow up final hit to the skill is not great dps either.  Also not so helpful is the Ranger version of Follow Up Attack called "Second Arrow" has a proc rate so insanely low I can't help but think it might be bugged.  Bolas holds up as as decent bossing skill (considering how many actions bosses get these days, jesus Drecom) but it isn't going to blow anyones socks off or anything.

    Ranger does also excel at map clearing though once you get the hang of placing their traps in areas you know enemies will walk through (I mean dude, your team "heard" the enemy and it is a 1 tile wide hallway most of the time... people make it sound like this is rocket science or something).  It is especially a really nice class if you DO want to manually go do Den's yourself since most of them have god awful spammy floor traps and the Ranger skills can counter them.  Just be aware you can't counter a poison cloud etc, it has to be the normal ones like floor spikes and such.  The ranger traps do need at least some thought for use though because size matters (hehehe) and if you use a log trap in a dungeon with a cieling (required for log trap) but you are being rushed by vorpal bunnies from hell... it wont help you they are too smol it will miss.  Likewise if you use a bear trap and it is some damn cyclops they are too much of a chungus and they will break it when they step on it.  Also be aware you can set off your own traps so.... don't be too dumb with how you place them.

    So long short I think Ranger is a pretty fun class that works well in the back row as a physical DPS, it's skills are awesome for clearing den's and trap heavy side dungeons like the new Alabaster Cave, and it is great for Auto Farming (particularlly Heinrico due to his unique passive), and Ranger even needs less EXP than samurai or Ninja, plus they use bows available from day 1 in the game easily.  That said Yrsa herself isn't really a stand out or must pull kind of character unless you are a dwarf stan.  Her good alignment means she conflicts with Alice's back row formation buff, and a lot of people use Alice on the back row.  Her disciplie isn't bad because it gives her super extra SP and Rangers are SP hangry... but it isn't exactly exciting either.  Her skill as mentioned before is also kinda so so.  She has magic beast slayer as a passive too, but like.... there are Benjamin and Abenius with Fighter class right there.

    One last footnote for Ranger in general is they do benefit from really good speed growth, so even as a DORF with stubby legs Yrsa at level 70 with no BP investment or boosted/IV speed will still end up in the high 50's for speed.  Like 57-59 ish probably.  This beats your average level 70 fighter so it aint bad.

    All in all, she is an interesting character, I think Ranger is an interesting a fun class, but do I think she is definitively better than Standard Ranger Heinrico?  No, she is, but it isn't some big gap it's pretty small.  Am I going to boot someone for my standard progression party to make room for a Ranger?  No.  I might slot one in on my Auto Farm team though. 

    So the value of this banner really is going to come down to you.  If you can justify spending on a cute sweet nice gal female DORF character that really shines in auto farm and trap filled hell holes like Den of Earth, go for it. You will find a character that really can be a value add in a lot of farming situations (just don't trick yourself into thinking Ranger is a Treasure Chest class, it is not).  If all you care about is META GIMME META DPSSSS GRAAGGWEWRAAAHHHHH~!~~~!~  Then you should probably pass.
    
??? info "Shiro's Analysis"

    So we got the first legendary ranger. Class seems to be made around exploring and map traveling/qol with farming ability thanks to AoE more than boss killer type class unlike everything we had so far. 

    Going to her inheritance and passive. Her inheritance is good vs enemies with high eva/aspd, so mostly A4 enemies and probably some bosses? Might be a good debuff on sealed demon but I’m not sure about it myself. Damage seems to be good and it stacks with the number of hits the enemy gets during it. 

    Her passive is great for farming, similar to Abenius having beast slayer is the best choice for a farmer and if you use traps it also lets another ally to benefit from beast slayer! So great choice for farming with traps! Outside of it she can be of some help against the wolf boss in A4.

    Overall? Nothing you need to spend on it. But thanks to great passive/disc and inheritance for A4 she’s worth considering to be your choice for a pull. If you need AoE that’s it. A really great option but nothing amazing as for now. Unless I miss something. Also takes more xp than base class and less than advanced ones.
    
## Adventurer Pull Plans

??? note "TheAxolotl's Pull Plan"
    I pulled a couple copies, one of which went to the OCD Discipline. I'm holding off on using the other copies, as I'm hoping we'll see some bug fixes for First Arrow in the near future. For now, she's sitting nicely in my 3-ninja team.

??? note "Karkarov's Pull Plan"
    I did around 75ish pulls.  I might go to 100 just to get the bow to test with it, with it's aoe buff and high base accuracy it's possibly the best Ranger bow.  In those pulls I got two copies of Yrsa.  Personally I don't regret it, I think Ranger has a neat little kit and is a fun class design.  That said, I am not seeing anything critical or must have here.  If you love dwarves and are excited to see the first female one in game, go for it.  Don't feel like you are missing anything huge if you pass though.  Heinrico is also a Ranger, as a standard character is in the general pull list, and he is a great character in his own right.  One could argue his passive may even make him better for auto farming as it adds an extra layer of security.

## Duplicate Usage

* Inherit on her own skill will increase its damage.
* Increasing her Discipline will give her more SP.
