---
# Just change title to character's name, should match filename, and all data
# fields will pull from adventurers.csv, skills.csv, and image folder. 

   title: Yoizou

# Note image files are all lowercase, and are expected as:
# name-class.jpg, name-altform.jpg, name-class-personal-request.jpg
#
# Free text can still be added to any section in the relevant text block but
# skill text still needs to be indented 8 spaces.
#
# Reviews can be added at end be removing comments around relevant sections
# in free text block.  To not remove any block tags.  

# set debug parameter to true to save full markdown before HTML build
# in a {project_dir}/debug_output folder (if that folder exists)
   debug_render: false  

---
  
{% extends "Adventurer_parent.md" %}   
     
{% block InheritFreetext %}
{% endblock InheritFreetext %} 

{% block AltInheritFreetext %}
{% endblock AltInheritFreetext %}
     
{% block PotentialInheritFreetext %}
{% endblock PotentialInheritFreetext %}

{% block UniqueSkillFreetext %}
{% endblock UniqueSkillFreetext %}

{% block AltUniqueSkillFreetext %}
{% endblock AltUniqueSkillFreetext %}

{% block DisciplineFreetext %}
{% endblock DisciplineFreetext %}

{% block AltDisciplineFreetext %}
{% endblock AltDisciplineFreetext %}

{% block ReviewsAndAnalysis %}

## Adventurer Reviews

??? info "TheAxolotl's Analysis"

    It's time for our second legendary Samurai to come around, and while he's also released with a new weapon type, I'm not going to touch on that here. This is simply going to look at his kit. All in all, he's...fine. He excels in a niche that isn't really needed, and if you're comparing him to Shiou, I'd argue that Shiou has more universal use and appeal, but let's dig in!

    First, we'll talk about his inheritable skill, Blazing Resplendence. While I don't have the numbers for this skill, it's a combination buff, debuff, and attack all in one. It buffs your fire damage dealt, increases your water damage taken, and then attacks with a Moderate attack. Not a bad one point inherit for a fight that needs fire damage, but...those really don't exist. When inherited, it seems to be ballpark a 20% fire type boost, while on Yoizou himself, it's around 25% or so. Not horrible, but the bigger problem is that there just aren't any situations where you'd need that fire damage boost to begin with.

    Moving on to the more interesting skill, let's talk about his Running Flame line. This skill, like Shiou's Ephemeral Illusion Stance, is his nuke, and at a glance, it's pretty neat. You use the skill to deal Moderate damage to a row, and then skill changes to Running Blaze. You use Running Blaze to deal Major damage to a row, then it changes to Running Inferno. Finally, you use Running Inferno to deal Massive damage to a row, then his ASPD and Evasion get debuffed. Each of these skills can be used once in a fight and they don't need to be used sequentially.

    Here's where things start to break down a bit. First, you need to use Flame-Bearer to even be able to start with Running Flame. That means a total of at least 4 turns must be taken before you're dealing Massive row damage, and at least 5 turns total if you want to use Blazing Resplendence first. If you die at any point after starting the Running Flame sequence, you'll need to spend a turn to re-cast Flame-Bearer. By the time you're able to deal that massive damage, most things that need row-level damage will be dead, so you automatically lose some value there. Also, if you happen to get to the end of the Running line and deal that Massive damage, you're going to be debuffed for 3 turns right after.

    Since you don't have to use the Running line in consecutive turns, you could save those ramped up attacks for specific turns in fights where a strong enemy might periodically summon other enemies, but it's still a decent amount of ramp up to maximize value, and your party likely has better, more efficient ways of dealing with those enemies.

    His Discipline skill, Flame of Revolt, is Magic Power and Magic Defense, which is fine.

    I will say that I do actually like the approach the devs are taking with Samurai. Giving each legendary Samurai a unique nuke is a fun way to keep mechanics interesting, and in a vacuum, I don't mind the ramp-up nature of his skill. The bigger issue is that there's just not enough content around right now where you'd get the full value out of his attacks, and there's very little incentive to use him over Shiou. All in all, he's an okay adventurer that feels relatively skippable to me. 

## Adventurer Pull Plans

??? note "TheAxolotl's Pull Plan"
    
    If I get him with free bones, I might do something with him, otherwise I'm saving.
  
 
## Duplicate Usage

* Inerhiting his own skill can increase its effectiveness
* Inherit to someone else for situational fire damage boosting
* Discipline will increase his damage a bit. Keep in mind, though, that Samurai only have a ~0.65 multiplier on their Magic Power contribution to effective Attack Power, so the actual damage contribution from a Magic Power Discipline would be less than the contribution to a Mage.
{% endblock ReviewsAndAnalysis %}
