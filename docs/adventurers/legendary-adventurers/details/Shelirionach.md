---
# Just change title to character name, should match filename, and all data
# fields will pull from adventurers.csv, skills.csv, and image folder. 
#
# Note image files are all lowercase, and are expected as:
# name-class.jpg, name-altform.jpg, name-requestform-class.jpg
#
# Free text can still be added to any section, reviews at end, etc.

   title: Shelirionach
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
        ![](../img/{{title.replace(" ","-") | lower }}-{{chardata['Primary Class'].replace(" ","-") | lower}}.jpg)
{% if chardata['Secondary Class'] %}
    === "{{chardata['Secondary Class']}}"
        ![](../img/{{title.replace(" ","-") | lower }}-{{chardata['Secondary Class'].replace(" ","-") | lower}}.jpg)
{% endif %}
 
{% if chardata['Personal Request'] %}
    === "{{chardata['Primary Class']}} after Personal Request"
        ![](../img/{{title.replace(" ","-") | lower }}-{{chardata['Primary Class'].replace(" ","-") | lower}}-personal-request.jpg)
  {% if chardata['Secondary Class'] %}
    === "{{chardata['Secondary Class']}} after Personal Request"
        ![](../img/{{title.replace(" ","-") | lower }}-{{chardata['Secondary Class'].replace(" ","-") | lower}}-personal-request.jpg)
  {% endif %}
{% endif %}

{% if chardata['Alternate Style'] %}
    === "{{chardata['Alternate Style']}}"
        ![](../img/{{title.replace(" ","-") | lower }}-{{chardata['Alternate Style'].replace(" ","-") | lower}}.jpg)
{% endif %}

## Skills
<!-- 
skills will automatically fill
extra text can be added between skills
-->

{% if chardata['Alternate Style'] %}
!!! note "If standard {{title}} and {{chardata['Alternate Style']}} {{title}} are merged, inheritable skills are shared by both styles, but changing styles will swap any style-specific uninheritable passive and discipline skills."
{% endif %}

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

    Shelirionach is our latest mage, and she has a very interesting and unique kit.

    `Eyes That Know The Future` gives a nice defensive boost to mages and helps her avoid extremely strong one-shotting attacks, which at a glance seems just okay, but there's an interesting nuance to this. This skill can trigger multiple times within a turn, once for each enemy that attacks her. During testing we saw sequences of her evading an attack followed by her receiving reduced damage from two additional attacks within the same turn. This is quite noteworthy, as in theory, she could evade multiple times in a row, really adding to her defensive protections. Mechanically, this skill seems to work by having an `X%` chance of evading and a `1-X%` chance of reducing damage. As the skill level increases, the chance to evade increases and the chance to reduce damage decreases. This is quite powerful as more evades means a higher overall uptime of protection, but it's not clear how impactful each level increase would be.
    
    When inherited, there is a significant reduction in the activation rate, so it's likely not going to be too helpful when given to other adventurers, but something worth considering for the whales out there.

    This is fine since her Discipline is one of the stronger ones. While I'm not a big fan of Disciplines in general, `Child of the Sacred Tree` works great for Sheli since it boosts her two most important stats - Magic Power for more damage and Action Speed for maintaining optimal turn order.

    The real interesting mechanic, though, is with her signature skill, `Dream of the Sleeping Witch`. This skill has a lot of nuance to it, making for a very interesting skill. First, it helps alleviate one of the major issues that mages face right now - longevity in long dungeon exploration sessions. If Sheli is below 25% MP at the end of her turn, she will put herself to sleep. While sleeping, she performs two actions automatically - the first is that she nukes an enemy with a dark attack. This attack hits significantly harder than a manually-cast `ZELOS`. The second action is that she restores a flat 8 MP. This doesn't scale, but it can add up over a long time. If she ends up sleeping for 5 turns in a fight for some reason, she will restore 40 MP, and while she can only put herself to sleep once in the course of a given battle, she can put herself to sleep multiple times over the course of a given dungeon exploration session.

    There's a specific sequence of events that occur here. We need to verify this completely, but I believe the order of events is:

    1. If Sheli is asleep, perform her sleepy nuke.
    2. If Sheli is awake, take an action like normal.
    3. If Sheli is awake and meets the MP threshold criteria, she goes to sleep.
    4. If Sheli is asleep, she restores 8 MP.
    5. If Sheli is asleep, there's a chance for her to wake up.

    One important thing to note about this sequence is that early testing shows that if she puts herself to sleep, she's guaranteed to stay asleep that first turn, so you are guaranteed to get 8 MP back. If a fight lasts 2 turns and she puts herself to sleep on turn 1, she is guaranteed to restore 16 MP as long as she's not woken up before her second turn comes.

    In addition to the MP restore and damage boost, she will not take double damage from attacks made against her while she's asleep. This is quite significant and will go a long way to helping a squishy elf mage stay alive.

    One key thing to think about with this skill is that the MP restore and the sleepy nuke will happen regardless of the source of her nap. This effectively means if you're in a fight where `KATINO` or `Eye of Torpor` gets used against you, she does not have a dead turn, as she's immediately perform her sleepy nuke when her turn came around.

    Shelirionach's kit is extremely interesting and nuanced. While it won't help a ton during the course of a boss fight, the MP restore can be quite impactful while progressing through a new map. In addition, her race, element, and Discipline are all very favorable towards her role as a damage dealing mage. Also note that while she does have access to `LAZELOS`, Sheli is the first legendary mage that does not have a `Secret Art` spell, so you won't get a boosted `LAZELOS`. I certainly don't consider her a must-pull, but I do personally think she has the strongest kit of any damage-oriented mage released thus far. If you have any spare Iarumas' around, Shelirionach makes an excellent recipient of a `TZALIK` inherit.

??? info "Frobro's Analysis"

    I will not mince words here; nor will I exaggerate. Shelirionach is the strongest mage in the game by a large margin. Shelirionach would occupy an S tier by herself if a tier list were constructed for units by class. Fundamentally, she plays an entirely different game than the rest of the field, and the game she plays is much more effective than what other mages have access to. Shelirionach was created by scientists in a lab to be as optimized as possible.

    Let’s start from the top. Dark/Evil/Mage/Elf/Female gives her a min-maxed stat line and access to synergy buffs from units like Milana, Alice, Arboris, Rinne, Elda, Emil and Red Beard. At the current end-game, (Post Abyss 3) Dark resist is the best resist to have and no boss attacks with the Light element. Her discipline focus stats are Magic Power and Action Speed; the ideal set.

    Onto the secret sauces. Dream of the Sleeping Witch is a perpetual motion engine; it constantly and reliably fuels Shelirionach’s MP. Unlike other mages who have to pick their shots and use cheaper forms of CC like the AOE debuffs (Dilto/Morlis/Balfeos) or statuses like Sleep to make large groups of enemies more manageable, Shelirionach is free to cast higher levels and therefore more expensive damaging spells, recklessly. Death; the best kind of CC! Shelirionach is allowed to deal, frankly, unreasonable amounts of damage in the long run compared to every other mage in the game while also being just as good at playing the “debuffing mage” role as her peers. The particulars of how this passive works include some extra bonuses for no reason! Shelirionach will regain MP, cast Slumbering Darkness and won’t take double damage while asleep no matter how she got put to sleep, meaning she is functionally immune to this status condition. While asleep, her Eyes That Know the Future skill can still proc, allowing her to mitigate or outright dodge mortal wounds. WHILE ASLEEP. As if that wasn’t enough, this passive dodges spells just cuz’, making it even less likely that an enemy can interrupt her sleep. Assuming the hit meets the “<50% of Max HP” pre-requisite, it will activate something around 70% of the time!

    Also, Also; the spell she casts while asleep, Slumbering Darkness, is equivalent to Zelos 6 and costs 0MP. Actually, it’s more like it costs negative 16MP since you gain that much anytime you cast it…at minimum. Oh, did I mention she casts this every turn for however long she stays asleep? At that point, you’re practically encouraged to upcast spells at higher levels just to deplete your MP to oscillate around 20%-30% of your max MP and access this move every battle. 

    My favorite fun fact is that the reworded Mental Unity description specifies that it increases the “Damage of attack spells that consume MP”, but for some reason still applies to Slumbering Darkness. Imagine this; Begin fight with >25%MP. Sheli’s turn, cast Mental Unity, fall asleep +8MP. Sheli’s turn comes back around, still asleep, boosted slumbering darkness for 1300dmg, +8MP…

    In conclusion, Drecom realized that legendaries need to be compelling and finally made something worth investing in. Do not listen to the downplay. What other mage can do even half of this nonsense?

??? info "Karkarov's Analysis"

    So the queen Sheli has gotten her rerun and a new class, Priest!

    So I am going to front load this analysis right now, if you are expecting to hear a lot of negative info, or for there to be catch 22's with Shelirionach... uh there really aren't any catches and I wont have much negative to say beyond "she is a banner character so you have to spend limited reources".  Sheli is simply put the best caster in the game at this point.  She was already the best mage, with the priest alt class she is now top of the world in the casting role.  So as of 9/11/25 (when I started writing this) there is no better mage/priest in this game, no, not even Alice, it isn't even close actually.

    So lets go into why that is.  First off is her unique passive skill which does a large number of different functions.  So "Dream of the sleeping witch" causes her to go to sleep if she falls to 20% max mp.  While asleep she will do a few different things.  First, she regens MP every round she takes a nap.  No other character in the game right now can regen MP outside potions (rare and hard to farm) and rest spots in dungeons.  Second she starts casting a single target bomb dark attack that is equivalent to roughly Zelos level 5-6... and she casts it for 0 MP.  To add insult to injury she also does not take bonus damage when asleep, unlike every other character in the game.  Being asleep also makes you immune to other mind effecting spells like Charm.  Best part... this counts for when enemies put her to sleep too, these effects are not tied to her 20% MP threshold, it just happens for sure at that point.  Vampire put Sheli to sleep?  Vampire just made a VERY big mistake, because to Sheli, Sleep is a buff.

    Then there is her inheritable skill "Eyes that know the future".  This skill is actually one of the most powerful tanking skills in the game.  When Sheli is hit with an attack that takes over half her health she will either A: dramatically mitigate the damage making it do significaly less than 50% of her HP or more, or B: Go "nah I win" and simply dodge the attack taking no damage at all.  The dodge happens at give or take around 20-25% rate, but the mitigation at level 1 of the skill on Sheli is basically 100% proc rate or so close it doesn't matter.  Also funny story, this mitigation/dodge CAN proc while she is asleep, and it works on any attack that targets her including spells.  This means Sheli has one of the only means in the game of dodging spells, all the evade stacking in the world cant do that for you.  Also somewhat sadly, as an inherit this skill is basically worthless.  The mitigation falls to sub 25ish% activation, and the dodge is single digit percent chance maybe not even 5%.  Leveling it also seems to have little to no benefit so the moral of the story is .... Sheli is not a good character to pull for using as an inherit.  This includes on Sheli herself, leveling the skill basically only improves the dodge rate for her, and not by much.

    This brings us to the reality of how meta Sheli is for traits / stats.  As a dark element female elf she gets the best possible base stats for a mage, and elf generally have the best caster stats for their racial growths.  Then her discipline is greatly improves Magic Attack and Action Speed.... the best possible discipline for a mage.  You pull a Sheli with an IQ boosted stat at level 1, good bonus points, invest it all in IQ, and she can easily break 90 IQ by herself.  She also has really strong action speed growth normally. So with a weak inherit, and absolutely meta discipline, it is obvious any dupes should go straight to pumping the discipline level of Sheli.

    Then last but maybe not least... she now has Priest as her alt class.  So if you want a tankier but still strong caster Sheli you can do that with priest.  This means she will also learn all the buffs, debuffs, heals, and attack spells (dark element at least) of mage and priest.  So she is a casting powerhouse.  Oh no!  She doesn't have a buff/debuff extention!  Ok, inherit one Alice on her, now she does.  She is also evil alignment so works with Alice's damage buff on the back row if you want to use both.  Or Milana's damage buff if you put her in front row as theif.  Or a few different dark element or elf based buffs, etc etc.  She is simply very easy to fit into your party comp, unless you are just an auto attack farmer where you don't want casters at all.

    The most critical thing about Sheli is she is one of the VERY short list of characters in this game where pulling one copy IS good enough to just put them in your team.  Her discipline is top tier, but she does not "need" her discipline levels to be good.  She doesn't "need" any inherits other than the inherits any caster would want.  You can pull her and she is instantly good to go to do her job, she just needs some gear, some levels, and some normal caster inherits.  Just like every other character.  She just doesn't need discipline, to level her own skill, or to inherit skills from other characters that aren't normal "Mage" inerhits etc.  There is no "gimmick" to make her work, she just works outright.

    There are no must pull characters in this game.  Shelirionach is really, really, really close to meeting that requirement though.  This is a character that has no real weakness, has the best MP economy in the game, and has a meta set up for their class and role from a traits perspective.  There is no catch 22, everything about her is good.  Other than her alignment, that's evil.

??? info "Shiro's Analysis"

    Let’s start with her inheritance. It's a really great passive source of survivability similar to Adam’s. There’s no reason why you wouldn’t want to inherit it just for a bit more of a chance for a better survivability because while combined with Adam inheritance, priest book and WotK your character suddenly becomes something way tankier than you could expect.

    Moving to her passive. While it's amazing on first glance and definitely great for all around purpose it can be a double edged sword. It surely works great on more regular enemies and bosses. Being basically “cheat” ability for farming purposes. Especially after auto changes as a priest. But what happens when you get into an actual hard boss fight where mages simply don’t perform well as damage dealers and she goes to sleep instead of being able to cast important buff/debuff or heal? Just pray that whoever else in your team also fits this role will make up for that dead turn or few. 

    Going to her discipline, it’s the same as Adam. Nothing much to say. It’s really good but it doesn’t bring anything specific to be worth chasing over her inheritance.

    Her class change is priest which is completely pushing her further into an amazing position as generalist. Because you can go for endless farming routes spamming DIOS or cleanses as much as you want because she’ll always regen MP. Also the best of course class change for mage.

    To sum it up. While Sheli is best generalist caster doing an amazing job at farming/clearing abyss she falls on boss scenarios not bringing anything as important as Alice gamebreaking buff duration or Madam/Miliana buff for the team. On top of that her passive ability can sometimes be an issue and ruin harder fights with bosses if you run out of mana fast. She’s unarguably the best caster for general abyss and farming by breaking game mechanics with MP regen but it becomes unimportant/problematic in boss fights where it eats one turn for just 8MP and skill that comes nowhere close to what fighters can hit. In short, she’s falling behind the best caster we have - Alice and options like Madam or Miliana when we’re dealing with a really hard fight despite her min-maxed female-elf-dark setup. Going for knight “recovery” passive is some sort of way to deal with it but then it’s basically ruining the purpose of what Sheli is - QoL for general content that’s not made for bosses in main idea.

## Adventurer Pull Plans

??? note "TheAxolotl's Pull Plan"
    I really like Sheli, so I pulled for a couple copies with the goal being a base copy and an OCD Discipline copy. I managed to get an additional copy that I gave to my MC, and if I happen to get another copy with the free bones, I'll likely take her up to D2.

??? note "Lynd's Pull Plan"
    Despite her name, I still pulled because she's cool. Should I have pulled more? Maybe, maybe. Did I? Nope.

??? note "Karkarov's Pull Plan"
    Shelirionach is the best caster in the game as of writing this pull plan (9/11/25).  I recomended pulling, the end, I dont care if you are new, a long time player, abyss 1, abyss 3, etc.  It does not matter, you can find a spot in your team for Sheli she is that good.  If you have the resources and can justify it you absolutely should consider getting 3-5 copies to get her to Discipline 2 or higher.  Again, if you have the resources and can afford it.  Everything about her is hitting all all cylinders, she has no weakness or "this could have been better" aspects.  If you are someone who is of the "I dont care, I dont need another caster" mindset, cool, pass on the banner.  Just know she is better than the casters you have if you give her a similar level of investment to what you gave them.

## Duplicate Usage

* Discipline to improve her Magic Power and Action Speed
* Inherit to herself to improve the activation rate of her "one-shot-prevention" skill
* Inherit her skill to other adventurers to give them a very low chance of triggering the "one-shot-prevention" skill
