---
# Just change title to character's name, should match filename, and all data
# fields will pull from adventurers.csv, skills.csv, and image folder. 

   title: Chloe

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
{% endblock %} 

{% block AltInheritFreetext %}
{% endblock %}
     
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

<!-- any Character Reviews and pull plans go down here. Just uncomment sections -->

## Adventurer Reviews

??? info "Shiro's Analysis"

    === "Everdistant Summershade"

        So we got really good passive improvement in her case. Going from adventurers to humanoid which while still being rather niche is way more common as soon as we hit the third abyss. Sadly it’s still not as common as magical beast enemies so as for now it’s good to have but won’t be helpful in most fights.

        As for her discipline. We have access to one of the best all around disciplines with SUR and SP. While sadly general adventurers suffer from less growth there than legendary counterparts she’s still standing out with it. So if you’re not using warrior battlecry commonly it’s worth to level her.

        As for her class change, it's a knight. Thanks to the rather huge SP pool Chloe can perform well in that role if you’re not using her as a fighter.

        To sum it up Chloe (summer version) offers us a really good setup (fire+beastfolk) with access to Donald bondmate for more SP and relics along with her high natural STR she gives a rather fat SP pool allowing for way safier spam of abilities thanks to it. On top of it if you get her discipline it’s further helping her SP pool and gives you a bit SUR. I personally find Chloe as one of the better adventurers thanks to it. Basically if you do not rely heavily on warriors battlecry she's a safe and good investment with a really good setup to be long going skill spammer on bosses.
<!--
## Adventurer Pull Plans

??? note "ABC's Pull Plan"
    -text-
-->

<!--  
## Duplicate Usage

*  option 1
*  option 2
-->
{%endblock ReviewsAndAnalysis %}


