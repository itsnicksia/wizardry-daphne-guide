---
# Just change title to character name, should match filename, and all data
# fields will pull from adventurers.csv, skills.csv, and image folder. 
#
# Note image files are all lowercase, and are expected as:
# name-class.jpg, name-altform.jpg, name-requestform-class.jpg
#
# Free text can still be added to any section, reviews at end, etc.

   title: Debra
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
        ![](../img/{{title | lower }}-{{chardata['Primary Class'].replace(" ","-") | lower}}.jpg)
{% if chardata['Secondary Class'] %}
    === "{{chardata['Secondary Class']}}"
        ![](../img/{{title | lower }}-{{chardata['Secondary Class'].replace(" ","-") | lower}}.jpg)
{% endif %}
 
{% if chardata['Personal Request'] %}
    === "{{chardata['Primary Class']}} after Personal Request"
        ![](../img/{{title | lower }}-{{chardata['Primary Class'].replace(" ","-") | lower}}-personal-request.jpg)
  {% if chardata['Secondary Class'] %}
    === "{{chardata['Secondary Class']}} after Personal Request"
        ![](../img/{{title | lower }}-{{chardata['Secondary Class'].replace(" ","-") | lower}}-personal-request.jpg)
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

{% if chardata['Alternate Style'] %}
!!! note "If standard {{title}} and {{chardata['Alternate Style']}} {{title}} are merged, inheritable skills are shared by both styles, but changing styles will swap any style-specific uninheritable passive and discipline skills."
{% endif %}

!!! info "Inheritable Skill"
    === "{{chardata['Inheritable Skill']}} {% if chardata['Alternate Inheritable Skill'] %}(Standard){% endif %}"
        {{ get_skill_description(chardata['Inheritable Skill']) }}

        <div class="nosort-table nofilter-table" markdown3>

        | Level | SP recovery amount (self) | SP recovery amount (inherited) |
        |:-----:|:-------------------------:|:------------------------------:|
        |   1   |             4             |                2               |
        |   2   |             5             |                3               |
        |   3   |             7             |                4               |
        |   4   |             8             |                5               |
        |   5   |                           |                6               |
        |   6   |                           |                7               |
        |   7   |             13            |                -               |

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

        Debra is our first Legendary thief, and she is great at it. She can deal strong damage for a thief, particularly later on when you have both Hiding and Sneak Attack unlocked. Her skills also allow her to regularly use Precision Strike to kill enemies for a net 0 SP use. When fighting bosses, her debuffs can be very helpful, with an extra nod to Delay Attack.

        That being said, it's very likely that other thieves might be released in the future that end up providing more damage or utility than she does. Her SP restoration becomes less crucial as she gets higher up in levels, as well, due to the high SP pool that Thieves have. She's extremely helpful to have now, but it's hard to say if she'll remain strong in the future.

        If you inherit her skill to other Adventurers, the restore amount will be cut in half, with skill level 1 returning 2 SP instead of 4.

    === "Golden Maiden"

        Debra's second style is here and boy is she okay. Setting aside the appearance factor, which is going to make every degen playing this game pull for her, the Golden Maiden style is a very minor upgrade in damage dealing potential to an adventurer that is rarely used for damage dealing.

        Golden Maiden Debra is focused on having very high surety, which is great until it isn't. Most of the hardest fights, where you'd want to see sure hits, have extremely high sure evasion values, which makes Debra's gains less impactful. In addition, her emphasis is on the 1h + Shield combination which is a weird mix given the recent 2h changes that push 2h (including bows) into the upper echelons of damage dealing potential.

        Looking at her skills, Dance of the Bold Advance gives her an unknown boost to Surety, Sure Damage, and Evasion while in battle. I suspect it's relatively minor, similar to all other passives like this, but hard to say for sure. It's certainly not a bad passive.

        Her new active, Mirage Hunting, is similarly okay. Early testing indicates that when it lands a sure hit, it's comparable in damage to Heavy Attack at the same skill level, but when it's not a sure hit, Heavy Attack deals more. This effectively makes it useless as an inherit to others due to the ~35-40% drop in effectiveness of active skills, which inherited Heavy Attack does not have.

        Her Discipline, Dancer of Liberation, boosts Surety, so it's already a non-garbage Discipline, and since it also boosts evasion, it's solidly synergistic with Mirage Hunting, effectively giving the skill a second minor surety boost. As with all other Discipline skills, though, it's a very low value per dupe, so keep that in mind.

        If you use Debra, her Golden Maiden form is a damage upgrade over her standard form, as long as you're using daggers or swords. The bigger question is whether or not she's worth a valuable first row slot in your party, and that's much more up in the air. She certainly won't compete with other heavy damage dealers such as Fighters and Samurai. We're also very close to the anniversary, so this banner is pretty much a big bait banner that many folks will be pulling on.

??? info "Frobro's Analysis"

    === "Standard"

        Talk about suffering from success. An inherit so desirable that people prefer to give it to other units rather than build it up on the unit who gets the most potency out of it. Debra is a more damage-oriented thief than her peers not unlike how Adam is with mages. Her Skull Study reduces, the cost of “thief spells/skills that cost 3-10 MP/SP” and when coupled with Blessing of the Beastfolk God, she can use Precision Strike as a replacement for her basic attack extremely early in the game. At those early sections of the game, that +30 surety from Precision Strike is outrageous. 

        As a side note, Precision Strike is in the daily shop rotation, which makes it a surprisingly easy skill to level up for being a premium skill with no inheritor. Another idea is to inherit heavy attack instead as she can still more freely use it with her high SP pool and SP regen. While on the subject, her high dexterity makes her a good candidate for inheriting high levels of Armor Break which will also synergize with Cunning Pursuit for even more damage. Who cares about the discipline, when you can level up the inherit on anyone?

        Plus she’s neutral aligned which lets her be compatible in the front row with Lana as a dodge tank with her high evasion, or as a bow user in the back with Alice. She is held back by her 2nd class being knight. I wonder what the people would think about her if it were fighter instead…

    === "Golden Maiden"

        Aka, Debra 2. As a stand-alone unit, she’s on par with the other premium thieves like Aldric, Arboris, Rinne, and Savia, which is basically normal thief utility with some extra spice on top. The “spice” normally comes in the form of an attack that can shore up the thief class’s weaker damage output relative to fighter/samurai. In that regard, Golden Maiden is no different. Mirage Hunting is the attack that’s better than Precision Strike 3 that Debra needed, though you may need to level the skill to 3 before you can really feel it. But what’s not to like; it grants bonus surety rate/damage that scales of evasion! With enough surety and this skill, you can reliably get sure hits on enemies that the devs didn’t intend us to!

        The Discipline is better than base Debra’s being Surety & Evasion focused, but I can’t help but feel like the unique passive is worse. Ever since the 2-hand weapon rework, 1-handers that aren’t exceptional are in the mud. You’d be better served by giving her a bow, even if you are in placing her in the front row, which means he passive won’t ever be activated. While not super strong, base Debra’s thief skill cost reduction passive is better than nothing.

        The most interesting thing about this new Debra is that she gets full potency on both of her inherits at the same time! Full SP regen + Full strength Mirage Hunting, no matter what style she is currently in! Plus, if your merged Debra is D1 in both styles, you can use Base Debra to discipline the Golden Debra Discipline since they share levels. If you get 1, merge it with base Debra.

??? info "Karkarov's Analysis"
    
    === "Standard"

        I really like giving the melee / physical dps I use Debra inherits.  Debra herself?  Her alignment lets her work in a lot of dispatches, so that's cool.  No seriously, she is too valuable as an inherit, and there are too many other thieves and knights in the game that are competitive with her or better.  Arboris, Bakesh, Amelia, Viviana, hell even Jean, or if he ever gets a re-run the my opinion best thief in the game Aldric.  Knight wise there is Balbadus, Savia, El Dorado, Ekhart, or you know.... alt class Elise????

        Her discipline is mediocre (+attack, and + paralysis resistance), her non inheritable skill is just bad (-sp cost on 3-10 sp thief skills), she is fine as a thief party member if you are new and happen to pull her I suppose. However, long term, there are just better choices, and her inherit is too valuable on other characters.  Her class combo of thief / knight is also not doing her any favors.  Go with thief / fighter "IM PHILIP!!!!" over Debra even, and no I can't believe I actually typed that.

    === "Golden Maiden"

        Well this is new, the alt skin is so much a different character you don't even recruit her with the name Debra.  Well I clearly wasn't impressed with Debra herself over than as an inherit fodder for other melee/physical attackers.  How will the Gold Maiden fair?  Spoiler: not much better.

        So Mirage Hunting reads really cool and on paper looks great, but in actual practice it is simply very very bad.  On a level vs level basis it will just edge out and beat Heavy Attack, but it will also cost much more SP than Heavy Attack of the same level.  If you perform a Heavy Attack level attack that is still close to the same SP cost of your Mirage Hunting level but just slightly less SP how does it go?  Well.... Heavy attack just does slightly more damage for slightly less sp.  Yes, even if you don't inherit it and use Mirage on Gold Maiden herself.  How does it perform on inherit?  Yeah, don't do that, it is absolutely garbage.  As an inherit it loses to preceision strike, nuff said.  This sounds great on paper as I said, but in real use it is just bad heavy attack.  All the gimmicks of evasion contributing to surety damage etc simply dont add enough on the low base damage to make a meaningful difference.

        What about the new uninheritable unique skill?  Well it requires Gold Maiden be in the front row.... that's bad unless she is a knight really but ok.  Oh and you have to use a one hand weapon and a shield.... so the sub optimal dps choice for a knight.  Sweet.  Simply put this skill is what I am calling a "Gerard Tier" skill.  Doing what you need to do to activate it results in a worse set up than just ignoring it does.  If you really use this character it either needs to be back row thief with bow, or front row knight with a two hander to help on dps.  Both of those choices nullify this skill.  Normal Debra's uninheritable skill is bad, but at least it does "something".

        There is one single glimmer of home though if I am being honest.  She legitimately has a good discipline, Surety and Evasion boosted.  This is a straight improvement over normal Debra, and helps her hit the surety she will need a lot easier at higher discipline levels.  So yeah, this is actually a nice uplift for the character if you can burn resources to build the discipline.

        Also despite the bedazzling, new name, and new skills all around.... she is still thief / knight.  This is just not a great class combo and there is no way around it.  Is she better than standard Debra?  Yes, Gold Maiden is absolutely better than normal Debra. Is she better than a leveled fighter / thief Benjamin with discipline?  No, not really.  Even though this is an improvement on the character, and she is going by a new name, she is still just Debra at the end of the day.

??? info "Shiro's Analysis"

    === "Standard"

        Starting with her inheritance she gives you the ability for a better SP economy. Which… similar to Adam is more a problem for her than a bonus. Because inheriting her physical characters make it easier for you, leading to less interest in raising Debra herself. Still, her inheritance is amazing and it’s definitely shining in earlier parts of the game and in castle ruins.

        Moving to her passive. Again similar to Adam it’s limited up to 10 cost abilities. Why? I wish to know. So similar to Adam it’ll show value in the first and second abyss and fall in the third one. 

        Going to her discipline allows you to build paralysis tolerance… which is niche at best for now. Unless we won’t get more annoying enemies with it in future it’s not really worth consideration as for now.

        Her class change is knight which is IMO upgrade over her thief class. Not only her SP regen is more impactful there thanks to lower SP pool on knights but she’s also having access to better weapons and more armor pieces making her easier to build. On top of that she’ll have less survivability issues letting her to be picked against some dark bosses with light weapons and Madam for optimizing her damage potential.

        To sum it up… it’s really short analysis but there’s just not much to talk about. Her main selling point is her inheritance and ability to make abyss one and two easier for people in early game, with Old Castle on top of it… but that’s pretty much all. She's a standard banner and she’s great at doing what standard banners characters should do - making game easier for newbies.

    === "Golden Maiden"

        As soon as she dropped I was amazed reading how much text her passive and inheritance had. Which turned out to be effective bait…

        Starting with inheritance. It’s not worth using it on other characters. It works good on Debra especially if you hit lvl 3+ on it and you have somewhat descend evasion (200+ with bow). From my personal experience using Mirage Hunting works better when she uses it as a knight and would be really great if she had access to fighters to balance out STR and evasion even more… but it’s what it’s

        Moving on her passive. It barely helps from what I’ve noticed. A lot of text with minimal effects. As a thief you’re better to go bow on frontline with her than shield+sword/dagger, and as a knight you have even better 2h weapon access. I don’t need to say much more there. And no, even when I tested it with +60 evasion shield with a really good Sword of Promise it doesn't even come close to covering the difference with sword vs bow (at least on lvl 1 Mirage).

        Her discipline is actually amazing and it’s one of those rare cases where it’s worth investing. Mostly thanks to how strong SUR disciplines are compared to rest. 

        To sum it up. If you like using Debra and you want to use her go ahead and pull. Get her Mirage Hunting on at least lvl 3 and then you can think about raising her discipline on higher levels. Or just focus on getting lvl 7 Mirage Hunting while using regular Debra for upgrading her discipline. Anyway she's a solid option for a thief and she’s on the better end of them. Just turned out to be more impressive by sole descriptions rather than in practice. She’s also performing better as a knight than a thief… so go ahead and grab her book if you’re using her. Thanks to the latest auto battle changes she’s our auto queen now allowing all the skills up to 13 SP to be cast for free (as long as you have her inheritance maxed out).

## Adventurer Pull Plans

??? note "TheAxolotl's Pull Plan"
    I might snag a copy just for the merge, but in general, I'd rather save for the anniversary. Nothing about this kit is going to make me use her more than I already occasionally do.

??? note "Karkarov's Pull Plan"
    This is absolutely a bait / gooner banner it's that simple.  If you like sexy cat girls, just want to have one of every character, or for whatever reason use normal Debra and want to get a discipline level and a merge in?  Ok, go for it.  Pull one, maybe two copies for you mergers.  But beyond that I can't advise anyone to pull on this banner.  Even if anniversary wasn't three weeks away (9/25/25 as this is being written), I would still say don't pull.
    
    She doesn't bring anything to the table that makes her better than other thieves that are in the general pool, or even other knights in the general pool.  I think this banner will make Drecom some money, but for all the wrong reasons.


## Duplicate Usage

* Golden Maiden dupes could be used to boost her signature skill damage or her Discipline. I'd lean skill over discipline, but you do you. It is not worth inheriting her skill to other adventurers, as Heavy Attack is much more easily available and will outperform Mirage Hunting in most scenarios.
* Standard style duplicates are greatly desired by any SP-users you run. Pretty much everyone wants at least one copy of her, if not more
* Increasing her standard style Discipline will increase her damage, while inheriting her skill to herself will increase the SP restore amount
