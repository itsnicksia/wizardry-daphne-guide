# List of Skills per Class

[List of Skill Descriptions](./skills-and-spells.md)  

- Restrictions: Skills marked <em>class</em>-resctricted can only be used by that class, and become unusable if the adventurer changes to another class.  <em>Item</em>-restricted means the adventurer must be using that particular piece of equipment to use the skill.
- Mages will learn Single-target, row-target (MA-) and all-targets (LA-) version attack spells according to their type (element).  Elemental types will learn spells of their element and the element they are weak against (e.g., fire and water). Light, Dark, and Void types will only learn their spell types.  

=== "Fighter"

    {{ populate_quicklist(filter_values=['Fighter'], 
    file='skills.csv',
    return_columns=['Name','Type','Level','Restriction'],
    filter_column='Class')
    | linkify_quicklist_skillnames
    | sort_mixed_values(sortcol="Level")
    | convert_to_md_table 
    | add_indentation(spaces=4) }}

=== "Knight"

    {{ populate_quicklist(filter_values=['Knight'], 
    file='skills.csv',
    return_columns=['Name','Type','Level','Restriction'],
    filter_column='Class')
    | linkify_quicklist_skillnames
    | sort_mixed_values(sortcol="Level")
    | convert_to_md_table 
    | add_indentation(spaces=4) }}

=== "Thief"

    {{ populate_quicklist(filter_values=['Thief'], 
    file='skills.csv',
    return_columns=['Name','Type','Level','Restriction'],
    filter_column='Class')
    | linkify_quicklist_skillnames
    | sort_mixed_values(sortcol="Level")
    | convert_to_md_table 
    | add_indentation(spaces=4) }}

=== "Priest"

    {{ populate_quicklist(filter_values=['Priest'], 
    file='skills.csv',
    return_columns=['Name','Type','Level','Restriction'],
    filter_column='Class')
    | linkify_quicklist_skillnames
    | sort_mixed_values(sortcol="Level")
    | convert_to_md_table 
    | add_indentation(spaces=4) }}


=== "Mage"

    {{ populate_quicklist(filter_values=['Mage'], 
    file='skills.csv',
    return_columns=['Name','Type','Level','Restriction'],
    filter_column='Class')
    | linkify_quicklist_skillnames
    | sort_mixed_values(sortcol="Level")
    | convert_to_md_table 
    | add_indentation(spaces=4) }}


=== "Healer"

    {{ populate_quicklist(filter_values=['Healer'], 
    file='skills.csv',
    return_columns=['Name','Type','Level','Restriction'],
    filter_column='Class')
    | linkify_quicklist_skillnames
    | sort_mixed_values(sortcol="Level")
    | convert_to_md_table 
    | add_indentation(spaces=4) }}


=== "Ninja"

    {{ populate_quicklist(filter_values=['Ninja'], 
    file='skills.csv',
    return_columns=['Name','Type','Level','Restriction'],
    filter_column='Class')
    | linkify_quicklist_skillnames
    | sort_mixed_values(sortcol="Level")
    | convert_to_md_table 
    | add_indentation(spaces=4) }}


=== "Samurai"

    {{ populate_quicklist(filter_values=['Samurai'], 
    file='skills.csv',
    return_columns=['Name','Type','Level','Restriction'],
    filter_column='Class')
    | linkify_quicklist_skillnames
    | sort_mixed_values(sortcol="Level")
    | convert_to_md_table 
    | add_indentation(spaces=4) }}

=== "Ranger"

    {{ populate_quicklist(filter_values=['Ranger'], 
    file='skills.csv',
    return_columns=['Name','Type','Level','Restriction'],
    filter_column='Class')
    | linkify_quicklist_skillnames
    | sort_mixed_values(sortcol="Level")
    | convert_to_md_table 
    | add_indentation(spaces=4) }}


