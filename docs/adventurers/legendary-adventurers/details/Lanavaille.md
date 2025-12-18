---
# Just change title to character name, which must match filename
# and filename case, and all data fields will pull from
# adventurers.csv, skills.csv, and image folder. 
# Note image files are all lowercase, and are expected as:
# name-class.jpg, name-altform.jpg, name-class-personal-request.jpg
# Page won't render until any new skills mentioned in adventurers.csv are
# are added to skills.csv

   title: Lanavaille
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

!!! note "If standard Lanavaille and Wandering Princess Lanavaille are merged, inheritable skills are shared by both styles, but changing styles will swap uninheritable passive and discipline skills."

!!! info "Inheritable Skill"
    === "{{chardata['Inheritable Skill']}} {% if chardata['Alternate Inheritable Skill'] %}(Standard){% endif %}"
        {{ get_skill_description(chardata['Inheritable Skill']) }}

        <div class = "nosort-table nofilter-table" markdown>
        
        | Level | HP recovery amount (self) | HP recovery amount (inherited) |
        |:-----:|:-------------------------:|:------------------------------:|
        |   1   |             12            |                6               |
        |   2   |             22            |               11               |
        |   3   |             34            |               17               |
        |   4   |             44            |               23               |
        |   5   |             58            |               30?              |
        |   6   |             68            |               38               |
        |   7   |             85            |                -               |

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

        !!! note "This damage increase is approximately 8%."

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

<!-- any Character Reviews and pull plans go down here. Just uncomment sections -->

## Adventurer Reviews

??? info "TheAxolotl's Analysis"

    === "Standard"

        Lanavaille is our first Legendary Knight, and she brings some pretty solid utility to your party. Not only does she provide defensive capabilities, her ability to buff a Good/Neutral row can be very powerful, particularly if you have a Good/Neutral MC. A front row of Lanavaille - MC - Debra/Gerard is very common at the moment, and all three units would benefit from the increased damage.

        In addition to her battle prowess, Lanavaille's end of battle heal is extremely valuable early game. While the initial heal amount is only 12, increasing the inheritance level will boost the heal value up to stay competitive as you progress throughout the game. This heal is often potent enough to allow you to save your healer's MP while grinding/farming or progressing through the story. The heal won't provide any real value during boss fights, but her damage boost will.

        If you have an evil MC, however, her value drops significantly.

    === "Wandering Princess"

        The newly fixed skills for Wandering Lanavaille are quite interesting, as they provide some nice minor buffs without fundamentally changing the character itself. The ASPD boost on Valiant Righteousness is very minimal at 2 ASPD per slot, however it only considers the weapon and chest armor slots. This means at most, you'll see a 4 ASPD boost.

        The changes to her Discipline nice - you should never say no to more HP, and Critical Tolerance will help prevent instant death, which is always good.

        Neither of these skill changes are game-breaking by any means, so if you don't like Lanavaille as an adventurer or you prefer her standard style, you won't really be missing out on anything by skipping her. If you like her, though, her Wandering Princess form is all around better than her standard form and going for a couple copies wouldn't be a bad idea at all.

        Wandering Lanavaille is the first adventurer that enables the [merge](../../../frequently-asked-questions.md#what-is-merging-and-should-i-do-it) option in the training room. This combines the two styles into a single adventurer and adds another passive skill that provides a very minor boost to a few stats. There is no real reason not to merge the two styles together. From there, you can choose which style you want to use.

        One key thing to note is that Discipline is tied to the particular style, so standard Lana dupes cannot be used to increase the Discipline of Wandering Princess Lana. This actually makes it an easy choice for standard dupe usage if you use Wandering Princess Lana, as inheriting standard Lana dupes to the merged Wandering Princess Lana will give the best value.

??? info "Frobro's Analysis"

    === "Standard"

        Do I even need to explain this one? One of the few well-aligned party buffs in the game. That post-battle healing is incredibly strong. At level 1 it falls off after the early game which makes people think lowly of it, but it is great even at level 60 with just a few more levels. Assuming you use Lana, this isn’t the worst use of Codexs around. I don’t even bring a healer when auto-farming events anymore.

        The real kicker here is that to reach her full potential, you gotta switch Lana to fighter. (After learning all the knight stuff first) The downside is having to look at dork fighter Lana. The upside is that Wana exists. Besides looking better as a fighter, Wana also gets an ASPD boost with a gear-based conditional and turns Lana’s “whatever” discipline focus into “whatever…but better”. When merged, you only need to level the Queen of War and Love skill on one unit to apply it to both styles.

??? info "Shiro's Analysis"

    === "Standard"

        Starting with inheritance. It's a really strong one for the early part of the game-mostly abyss one and two. But even when maxed out in the third abyss it feels like QoL at best and having it on her or your MC will rarely make difference in long run despite halved healing. Because either enemies don’t do enough DMG and healing won’t matter or they hit too hard and it’s not enough. Never in the sweet spot to justify using Lana alone for it.

        Moving to her passive. It’s good. Massively overrated to a point where people lose their heads saying you’re not allowed to run an evil front but still good. But in practice? Unless you stack it with other % bonus passives like Madam or Elise you’ll barely feel any difference in fights outside that light dopamine kick from slightly bigger numbers. Definitely not worth worrying about team comp just to run around it.

        Her discipline felt like absolute ass for a really long time till we got to the third abyss. And now it turned out to be actually a good one. Having charm/conf resistance will never go wrong and allows you to build faster immunity. Definitely worth investment after you’re done maxing out her inheritance on her.

        Her class change is a fighter which is a massive upgrade to her. Once you’ll get it there’s no reason to go back to knight. Her lane buff starts to become more useful on her too as she’ll be one of your main damage dealers with access to it.

        To sum it up. Lana is not game changing by any means but she’s still a great solid pick. If you’re running an evil team, kick her out or use her in the backlane for some auto farming setups with Abenius, Debra or whoever else you might use in the back as a neutral/good damage dealer. It was nice to have “Lana meta” back in the days when we didn’t have that many strong evil options and when her buff somehow makes for gaps in your equipment. Otherwise? Nothing worth losing your head about or panicking that you don’t have her. But hey. She’s good at buffing Liviana backlane damage.

    === "Wandering Princess"

        She gets some bonus ASPD from 1h sword, light armor and slightly more bulk on discipline. Nothing to write there over it. It's an upgrade especially for speed tuning but that’s all.

## Adventurer Pull Plans

??? note "TheAxolotl's Pull Plan"
    I pulled for a couple copies of Wandering Lana. My main goal was a base copy plus a single copy for the OCD Discipline. Getting rid fo the OG Lana's voice was a big enough reason for me to pull.

## Duplicate Usage:

* Either Inherit her standard style dupes to level Queen of Love and War or Discipline the standard style.  
* Wandering Princess dupes can either be used for leveling Aegis Smash or Discipline the Wandering Princess style. 
    * Remember, if you merge Lanavaille both styles will need at least discipline 1 to benefit from merged combined discipline.
* Inherit standard style Queen of Love and War to the MC, just remember that this skill does not stack.  Only the highest HP heal on any character will trigger at the end of combat.
* Inherit Wandering Princess Aegis Smash to a physical damage dealer.
* Save for future use or dismiss for Grade tags.
