---
# Just change title to character's name, should match filename, and all data
# fields will pull from adventurers.csv, skills.csv, and image folder. 

   title: Amelia

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

    Her passive reduces air damage received by beastfolk in the same row. So unless you have a specific team and you focus on a specific enemy like cyclop you won’t see much value in it.

    Her discipline further buff her ability to be a good chest opener. But that’s pretty much it. I wouldn’t consider it especially while her inheritance is one of the best around options.

    As for her class change its fighter which is perfect for her case. It gives her access to classes that synergize with her really well. If you’re considering using Amelia make sure to grab the book.

    To sum it up. Amelia, while not having good passive or discipline, has access to fighter and thief class while being a fire beastfolk. This allows her to access a rather good SP pool making her a really decent fighter option that leans to surety damage dealer. As for now while she has some potential she might not be the best option all around to pick among general adventurers. But if you want a well performing fighter, Amelia is your option. Things also might change in future if she’ll get a good alternate version.

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
