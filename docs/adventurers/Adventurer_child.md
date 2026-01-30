---
# Just change title to character name, should match filename, and all data
# fields will pull from adventurers.csv, skills.csv, and image folder. 
#
# Note image files are all lowercase, and are expected as:
# name-class.jpg, name-altform.jpg, name-requestform-class.jpg
#
# Free text can still be added to any section, reviews at end, etc.

   title: Adam
---

{% extends "./Adventurer_parent" %}

{% block InheritFreetext %}inheritfree{% endblock %}

{% block AltInheritFreetext %}altinheritfree{% endblock %}
{% block PotentialInheritFreetext %}potinheritfree{% endblock %}
{% block UniqueSkillFreetext %}uniqueinheritfree{% endblock %}
{% block AltUniqueSkillFreetext %}altuniqueskillfree{% endblock %}
{% block DisciplineFreetext %}discfree{% endblock %}
{% block AltDisciplineFreetext %}altdisc{% endblock %}
        
<!-- any Character Reviews and pull plans go down here. Just uncomment sections -->
<!--
## Adventurer Reviews

??? info "ABC's Analysis"
    -text-

??? info "DEF's Analysis"
    -text-
-->

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
