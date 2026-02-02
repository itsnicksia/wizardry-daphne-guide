---
# Just change title to character's name, should match filename, and all data
# fields will pull from adventurers.csv, skills.csv, and image folder. 

   title: Benjamin

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

    We start with a really strong passive that works against the same enemy as Abenius - magical beast. It’ll be not only a passive that’ll be helpful in the third abyss thanks to this enemy type being rather common. It also will carry you over the whole second abyss if you decide to use Ben there.

    Moving to his discipline there’s nothing special going about it. On top of that his inheritance is something really good for any of the characters so it’s not really worth considering.

    As for his class change, he gets access to thief-class that synergize really well with fighters for pushing his damage potential further.

    To sum it up. Benjamin is dwarf with earth element which makes him quite bulky and har hitting especially in the second abyss. Furthermore his passive boosts his performance over there even more making him one of the best possible options for clearing second abyss turning it into easy mode. But even after it thanks to his setup and passive he performs well as a fighter in third abyss. If you’re considering general adventurers he’s definitely one of the best options out there. He’s one of our better generalists amongst them.

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
