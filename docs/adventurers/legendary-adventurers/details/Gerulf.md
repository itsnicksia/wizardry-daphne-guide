---
# Just change title to character name, should match filename, and all data
# fields will pull from adventurers.csv, skills.csv, and image folder. 
#
# Note image files are all lowercase, and are expected as:
# name-class.jpg, name-altform.jpg, name-requestform-class.jpg
#
# Free text can still be added to any section, reviews at end, etc.

   title: Gerulf
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

    Gerulf does one thing and one thing well. He hits hard with a 2h mace. If you're not using him with a 2h mace, he's not living up to his full potential. Unfortunately, there are some things that work against him right now. Since he's evil, he will actually hinder a party that uses Lanavaille, as both of them want to be in the front row and having them both there will negate Lanavaille's row buff. This likely won't be a permanent limitation, though, since in the future we should be able to build a strong Neutral/Evil front row.

    You can get around this by putting him in the back row with a spear, but that will limit the effectiveness of Eruption Strike.

    One other thing going against him is that the Port Town Grand Legion is full of water enemies, including the bosses, which will increase the damage he takes and reduce his Eruption Strike damage unless you inherit Adam to him.

    With the release of Rinne, Gerulf finally gets some solid Evil support from her Surety buff, which is a welcome addition to Evil teams!

??? info "Frobro's Analysis"

    This guy is a Min/Max stat gremlin with an uninspired kit. Aside from his discipline (Attack + Surety), there isn’t anything worth writing home about. That accuracy boost when using a 2 handed weapon is a joke. Why not accuracy, surety and attack; at least something comparable to the blessings he can get from a shield! Might as well pretend he doesn't have a unique passive.

    As for Eruption Strike, it’s basically Heavy Attack 3 but red and you gotta use a 2-handed hammer. Even if you use Gerulf in your party, you’re still gonna use Full Power Strike over this. An inherit skill so bad that even the owner doesn’t use it, wow. Beyond that, an evil front liner ruins the feng shui for many players, which makes his whole thing a no-go. Honestly, is this guy really any better than Benjamin?

??? info "Shiro's Analysis"

    Starting with his inheritance that was meme back in the days after 2h changes it started to hit as hard as DTS (when inherited on others - on Gerulf it’s even better option) which is a huge upgrade. The issue being that you need a 2h hammer for it. For himself with a 2h hammer? It's a great damage skill that will ditch out really high DMG and it’s nothing to laugh about anymore. Might synergize well with picks like Amelia/Chloe/Lana/Raffaello and shine strong if we’ll get wind theme abyss. As for now it's a solid option but it’s not as useful as Livena’s skill.

    Moving to his passive. He doesn’t have one. I mean… it’s there. But it could as well not be there and no one would see the difference.

    Moving to his discipline. He’s got one among the best for pure unga bunga purposes. SUR focused discipline is always a good choice to rise especially if you’ll want to max out and use your Gerulf. And it’ll be his best possible choice unless his future alternative version won’t bring something like double SUR focus or SP+SUR.

    His class change is priest. Which is a great choice for an evil party with an additional setup of buffs or cleanse if you don’t run Arboris. Otherwise it’s a bit of wasted potential for possible thief passives for SUR damage or knight for even more survivability.

    To sum it up. When it comes to unga bunga, Gerulf is your best choice and he’ll do it better than any other fighter. Definitely worth dropping the idea of going crazy over Lana passive and using him if you like him. The only issue is that he’ll be sitting on your front row with a 2h hammer to bring most of his potential. So if you’re using for example Galba that are already 2 front slots taken. His Eruption Strike is doing great damage now, his setup (fire, male, dwarf) is perfect for fighters that benefit greatly from STR and DEX with only demerit - low SPD. His discipline is great. He’s simple but he does what he’s supposed to do the best - using a hammer for crowd control. After all there’s no better crowd control than death.

## Duplicate Usage

* Inherit on his own skill will increase the damage and cost of his Eruption Strike.
* Once his Eruption Strike is maxed out, increase his Discipline to increase his damage further.
* Save for future use or dismiss for Grade tags.
