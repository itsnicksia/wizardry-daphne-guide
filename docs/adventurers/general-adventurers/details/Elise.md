---
# Just change title to character's name, should match filename, and all data
# fields will pull from adventurers.csv, skills.csv, and image folder. 

   title: Elise

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

    Elise passive serves the role of totem to buff your neutral character. Whenever it’s MC, Shiou or anyone else. There’s nothing more to it.

    Her discipline is nothing special. If you’re not using Armor Break go ahead and upgrade it. But if you do use them then don’t stress yourself over it.
    Her class change is a knight. Which allows her to fill the role of totem buffing your fontlane damage dealer from behind even more. But she’s not really well fitting because of being elf.

    To sum it up. If Elise would be a fire beastfolk we would have a way different talk but as it is she’s earth elf. Thanks to her element she’s not as squishy as frontlane as other elves but her SP pool still suffers heavily from it. It’s even less helpful that she’ll be most likely in the back lane mainly maintaining the role of buffing your neutral damage dealer as totem. While her passive sounds great it might not be the best case to even consider using her in a team. If she fits? Sure. Why not? But if your teamcomp is stacked with evil/good characters or you’re unsure if it’s worth slotting Elise in there then it might be better to go on and create a different team. And because of how her buff works she’ll never benefit from Clarissa on boss fights unless you’ll use Elise and Clarissa as your main sources of damage in the same column.   

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

