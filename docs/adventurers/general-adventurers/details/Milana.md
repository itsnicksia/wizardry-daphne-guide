---
# Just change title to character's name, should match filename, and all data
# fields will pull from adventurers.csv, skills.csv, and image folder. 

   title: Milana

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

    === "Standard"

        Starting with her passive, likewise as Elise she’s a totem that buff your teammate. This time it’s an evil one though. Looking at how many evil front options we have as for now it’s a great choice to pick her in your team if you have a slot just for this.

        Moving to her discipline. It helps a bit with her bulk and can save you up to a whole 2 more ASPD! Which… is nothing-by itself alone. But on the bright side her both inheritances are quite useless so it’s worth it to discipline her because you’re losing grade tags in the worst case. 

        Her class change is a mage. And that’s where the fun begins. Miliana as a dark-elf-female has the perfect setup to be a mage. Which means she’s one of best backlane choices to buff further your Gerulf/Galbados or whoever you use. 

        To sum it up. We have access to dark elf mage which is great for later parts of the game. On top of all while her SPD buffs are small she benefits from not only thief passive and discipline but also access to Arboris buff in back row. While those are small things it all adds up making her speed tuning slightly easier. On top of all she's a great option to bring to boss fights because while she’s not as good as Alice she’s still your second best option if you’re not using Madam buff. Not only will she buff your evil ally while having a perfect mage setup like Sheli. But on top of that you’re not risking that she’ll get hit with sleep status in a really long fight. Which makes her safer and better. If you’re looking for a general adventurer for your evil party then Milana is your pick! You can’t go wrong with her there. Her only downside is lack of access to priest class. But that won’t be an issue if you run Alice and Arobis along in the backlane.

    === "Thief of the Silent Night"

        Ok, this one is a sidegrade. Neither better or worse than the base version. But might bring more or less value depending on the scenario.

        Firstly It’s physical dmg reduction that works for her and the unit in front/back. Which makes it by default better than summer Yekaterina passive that work only on Yeka and backrow. Unlike physical attacks that aim only for backrow on character that doesn’t take dmg anyway and when she does it’s almost always magical, Milana can buff your squishy frontline character as long as it’s evil (f.e Rinne). Or Milana can be stuck in front as a thief and buff your Alice survivability if for some reason you need it. 

        The overall Milana alter version is a really nice example of how to give alternative options without directly making them better or worse. On top of it her inheritance is precision strike which alone brings value. So for me it’s an alternative done right that's a really solid option on physical enemies that target your front (Guarda GWO, Lizardman from cave, Necrocore superboss etc.) when you need survivability over damage increase.
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

