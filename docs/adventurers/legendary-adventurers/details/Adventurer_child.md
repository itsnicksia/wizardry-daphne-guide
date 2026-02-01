---
# Just change title to character name, should match filename, and all data
# fields will pull from adventurers.csv, skills.csv, and image folder. 
#
# Note image files are all lowercase, and are expected as:
# name-class.jpg, name-altform.jpg, name-requestform-class.jpg
#
# Free text can still be added to any section, reviews at end, etc.
   debug_render: true 
   title: Adam
---
  
{% extends "Adventurer_parent.md" %}   
     
{%+ block InheritFreetext %}
!!! note "This skill removes the dampening from spells that deal element type damage as well as the damage caused by element type skills and when using elemental weapons."
{% endblock %} 

{% block AltInheritFreetext %}
HHHHHHHaltinheritfree
{% endblock %}
     
{% block PotentialInheritFreetext %}potinheritfree{% endblock %}
{% block UniqueSkillFreetext %}uniqueinheritfree{% endblock %}
{% block AltUniqueSkillFreetext %}altuniqueskillfree{% endblock %}
{% block DisciplineFreetext %}discfree{% endblock %}
{% block AltDisciplineFreetext %}altdisc{% endblock %}

{% block ReviewsAndAnalysis %}        
<!-- any Character Reviews and pull plans go down here. Just uncomment sections -->
## Adventurer Reviews
  
??? info "TheAxolotl's Analysis"


END OF PAGE  
{%endblock ReviewsAndAnalysis %}
