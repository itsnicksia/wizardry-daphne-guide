---
# Just change title to character's name, should match filename, and all data
# fields will pull from adventurers.csv, skills.csv, and image folder. 

   title: Kiriha

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

    Starting with his passive it’s great if we use Kiriha as ninja… otherwise he needs to play as a dagger fighter to benefit from it. Which isn’t the best option as for now.

    Moving to his discipline. It’s nothing amazing but a slight boost in evasion shows further that the idea about Kiriha was to make him as evasive as possible. I’m quite surprised devs didn’t go further to make him a thief.

    His class change is a fighter which is great because he can benefit well from few ninja passives while holding emergency buff cleanse from the enemy. Other than that he’s mostly just your normal dark fighter which is great for third abyss.

    To sum it up. Kiriha is one of your best options when you’ll be facing dark enemies and you’ll need a fighter. If you’re looking for one of the options for a general fighter he’s there. If you need a ninja and you don’t have Rinne or Yuzu, then it’s even better. Definitely one of your better choices all around especially if you feel that your MC is not enough as the only buff remover in your team.

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

