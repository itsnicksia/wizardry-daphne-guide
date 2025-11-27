---
# Just change title to character name, should match filename, and all data
# fields will pull from adventurers.csv, skills.csv, and image folder. 
#
# Note image files are all lowercase, and are expected as:
# name-class.jpg, name-altform.jpg, name-requestform-class.jpg
#
# Free text can still be added to any section, reviews at end, etc.


   title: Arboris
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
**Class Change**: {%if chardata['Secondary Class'] %}{{ chardata['Secondary Class'] }}{% else %}None{% endif %}  
{%if False %}**Alternate Style**: {{ chardata['Secondary Class'] }}{% endif %}  


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

    Arboris is our very first limited legendary thief and he is, in my opinion, situationally useful at best.

    `Astral Break` is a major attack skill, which is great. It hits hard and provides a solid damage option for thieves. It's very costly SP-wise, at 20 SP for level 1, and being an elf, he already has a smaller SP pool than Debra, who is going to be his most common competitor. This skill is effectively an attack that simultaneously casts `PORTO` on himself and the adventurer in front of or behind him. At a glance, this seems pretty strong, but there are a few considerations. First, `PORTO` in itself is a conditional buff since it causes no impact on the turn it is used. When you're killing things fast, the `PORTO` portion of `Astral Break` will go to waste. For more extended fights, there's definitely value in it, but it's possible you could mess up your own turn order by getting `PORTO` simultaneously on one of the fastest adventurers in your party as well as presumably a slower one. Second, the fact that this buffs in a column means you have to pay extra close attention to your formation, as you'll want to position Arboris in front of someone that could gain value from the `PORTO` buff and have it actually impact the flow of a fight. Third, the `PORTO` portion is a buff, which makes it subject to the three buff limit, so if you use him, you'll want to keep that in mind.

    `Lord of the Deep Forest's Leadership` at a glance seems like solid evil and neutral support, however it also has some issues. First and foremost is that for the two skills being buffed, it is very hard to evaluate the effectiveness of the buffs. It is a Synergy that behaves similar to Rinne's Surety boost, always applying to him and extending to others that meet the criteria. Since it is a Synergy, that means we are unable to see the exact amount being modified, so it's a bit of a guess to know if it's even providing value. Initial testing currently seems to point to it being bugged and not doing anything, but we can't say for sure at this time. I'll update again when we know more. Assuming it is working, there are a few main scenarios I can think of where the action speed boost from `Lord of the Deep Forest's` may or may not be relevant.

    - You are perfectly speed-tuned to go ahead of most enemies you face and your buffers/debuffers always go before your damage dealers
        - In this scenario, gaining some passive action speed won't do much for you since it won't change your turn order and it won't make you outspeed enemies more than you're already outspeeding them
    - You have not spent much if any effort on speed tuning your party but you have made it so your party always goes before most enemies
        - In this scenario, the action speed could be nice, but you probably won't notice much of an impact since you aren't too worried about your party's turn order in general
    - You have speed tuned your party to go in the order you want but some of your party is still being outsped by enemies
        - In this scenario, you might see some benefit, as the action speed gains could be enough to finish getting your party going before the enemy, however it'll be variable based on the enemies you face. For example, vampires seem to have somewhere around 115 speed, and this synergy is very unlikely to be able to help you reach that.

    One potential consideration is that you could cut down on some of your ASPD blessings on certain adventurers because you know that they'd be getting the action speed from `Lord of the Deep Forest's` however that isn't something I'd really advise since we don't know the magnitude of the buff.

    I'm generally not a big fan of Discipline skills to begin with, so this will be short - in general, `King's Disposition` is absolute garbage as far as Discipline goes.

    Overall, having a conditional passive speed adjustment for a row and having access to a two-person `PORTO` could be situationally useful, but for most players, if you want to really mess with speed turning during a battle, using `BATILGREF` and `PORTO` will likely be both sufficient and a bit more consistent.

??? info "Frobro's Analysis"

    I feel like people see something that I just don’t with this one. Let’s start with the good. Astral break is a Major tier damage skill that doesn’t require setup like Sneak Attack, and since thieves are unimpressive in fights, this seems like a way to alleviate that. The cost of 20SP is way too high and the ASPD buff is generally unimpactful and cumbersome when trying to maintain more relevant buffs against the 3 buff limit. As an inherit to others, they’re better off using other damaging skills. It being earth element is lame too.

    Evil wins again with his passive Evasion and ASPD buff. I thought Wizardy “evil” was supposed to mean more self-centered! On the flipside, this discipline focus is a joke! Accuracy and Stun Tolerance…what?

    In closing, he’s a thief alright. A skill he can only use a handful of times, anti-synergy between his race/class, one of the worst disciplines in the game and limited availability. There are better general adventurers than this. Mid.

??? info "Karkarov's Analysis"

    How to sum up this character.... I think I know.  If I took the Drake Sword from Dark Souls 1 and turned it into a Wizardry Variants Daphne character it's name would be ""Arboris"".

    This character looks great at low level and in early game content thanks to his ridiculously expensive Astral Break skill that has a great damage floor, but garbage damage ceiling.  His earth element makes him seem top tier in the water paradise of abyss two.  Then you get to the lots of earth enemies abyss three, the SP cost of Astral Break combined with Thief drop off in damage potential makes you realize he isn't that good at doing damage over a long dungeon trip, the increase in enemy surety resistance, accuracy, spell use, blah blah blah.  Then you realize his value is falling so fast it might as well be a rock tossed off a cliff.

    Just like the Drake Sword he is a newb trap.  Something that is really strong in early game, but long term stops scaling and getting better, and gets surpassed by just about anything if you know what you are doing and how to invest in a character.  

    To make matters worse he has a terrible discipline (accuracy and stun tolerance boosted), his formation passive rules out good characters and is a very minor stat buff anyway (some I know have tested and suggested it is single digit numbers maybe even as little as 4 or 5 aspd/evasion), and he just got his alt class and it is Priest.

    Priest does basically nothing to enhance Thief beyond Priest Weapon Mastery which is +20% of your Piety to attack power.  Too bad Elves have low Piety, and Thief is competing for lowest Piety growth in the game.  Expect like 5-6 whole more Attack Power for this epic skill.  Even better all Thief does for Priest is a slight buff to Action Speed and Evasion.  There is just no synergy between these two classes, and with this second class Arboris is doomed to the role of just a support character.  

    Good luck outsupporting Mage/Priest Alice, Adam, or Yekatarina, or tanking Diva's Savia and El Dorado.  How about Madam with a Light Element character in front, or Mage Milana with Gerulf, or Elise with anyone nuetral, or..... you get it.

??? info "Shiro's Analysis"

    Starting with his inheritance. While extremely costly it’s one of the best late game options for any fighter/knight/thief. The reason behind is not only really high dmg and def bypass but build in column porto on cast. Having it on all the three rows with a mage that can cast BATILGREF can completely change how a fight will go, making some impossible fights into doable ones. The issue is that skill is extremely weak early game on. Well… not exactly weak. It’s very costly. So you probably will never use it outside the boss in the first abyss similar to the second abyss. On top of that Arboris SP poll is quite lacking. While earth element and thief class prove a bit of SP it’s still nowhere close to beastfolk. Things change as soon as you hit the third abyss or you’ll have access to Debra’s inheritance/SP relics. With it Astral Break becomes your best stable DPT option as long as you can maintain SP cost, turning a lot of fights (especially harder ones like any sort of superboss or 0C GWO with def up) into much easier ones. But that’s also his curse. Why use Arboris… if you can just inherit his astral to fighters with 2h weapons?

    Moving to his passive it’s really good buff for neutral and evil allies. At least on paper. Because while it can buff aspd and eva for up to 3 of characters it’ll rarely show value. Unless you’ll make some extreme speed tuning to balance around it. But then… gear is RNG based. In the end it might help with hitting some speed break points but it’s highly unlikely.

    Moving to his discipline. I don’t even know what to write there. It’s one of most useless ones at this moment unless for whatever reason the Necrocore focuses your Arboris all the time and you decide you need STUN immunity because of that. Otherwise I see no value in it.

    His class change is priest which isn’t a surprise. His astral and passive skills were already selling him a support and devs only went further on it. Which in the end led to not as good as fighters damage dealer, but better supportive ability in battle. Which is still good. Having access to extra cleanse/buff in the middle of a fight in case things go wrong will never be a bad choice unless your brain focuses on “unga bunga” and you want everyone to just hit as hard as possible.

    To sum it up Arbois is a great option in abyss 2 and gets even better in abyss 3 and later as the game proceeds and we have better SP pools. He’s a thief who leans to a supportive role in your team being 3rd slot fill next to other backliners you use (for example Alice and Adam). Him being a thief and having high ASPD while priest buffs being extremely cheap also allows you to throw out one of the priests that would just buff you otherwise and focus on one more damage dealer in a team. Definitely a really solid pick especially if you run neutral/evil teams.

## Adventurer Pull Plans

??? note "TheAxolotl's Pull Plan"
    Arboris was a pass for me. I personally felt the columnar PORTO was too situational for me to get a lot of value out of. I still managed to get a copy with a free bone, though. I don't know what I'll do with it, but he'll likely get inherited to someone in the future.

??? note "Lynd's Pull Plan"
    I pulled to get a single copy for collection reasons. If I didn't get him, I wouldn't have cared.
    
??? note "Karkarov's Pull Plan"
    This is a very simple Pull Plan.  Don't.  Arboris is whale bait.  Full stop.

    The best use for him is feeding copies to get the Main Character level 3 or more Astral Break. Which while an ""ok"" skill, costs way more SP than it should for what it does, and loses when compared SP spend to SP spend to basically all other skills the Main Character and others can learn from a damage perspective.  Meanwhile if you want to manipulate turn order try Delay Attack, Chronostasis, and the Porto buff.  None of those require spending gems on a banner to learn and are way easier to level.

    Unless you look at this guy and start going weak in the knees then swoon you should save your resources.  If you just love his look pull one copy for dispatch and call it a day.

## Duplicate Usage

* Increase the efficacy of his Astral Break
* Discipline to get very minor stat boosts
