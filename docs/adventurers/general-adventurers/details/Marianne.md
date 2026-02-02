---
# Just change title to character's name, should match filename, and all data
# fields will pull from adventurers.csv, skills.csv, and image folder. 

   title: Marianne

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

    Her passive is great for a priest class. And honestly? It’s better than her alternative version that lowers only costs of healing spells. Because let’s face reality. Priests will do buffs and cleansing most of the time with only occasional heals.

    Moving to her discipline. You can’t go wrong with more MP. But her inheritance is really amazing and you want to have at least one on lvl 3 in your team. So it’s most likely low priority discipline unless you really love using Marianne.

    Her class change is a mage which is great! After all there’s nothing better than priest+mage combo.

    To sum it up. Marianne. Especially her base version not Greedy Saintness one is a great priest for all around abyss performance. Especially early on if you don’t have access to some great elves, priests and/or mana relics. If you’re wanting a general priest then she’s your best pick and you can’t go wrong with her. Thanks to being wind she’s also a bit faster which makes it a tiny bit easier to build her as a character that moves first in your team.

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
{% endblock ReviewsAndAnalysis %}

