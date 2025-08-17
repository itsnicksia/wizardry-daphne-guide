# Skills and Spells
 
## Active Skills

=== "Skill Description"
    
    {{ populate_quicklist(file='skills.csv',return_columns=['Name','Inheritable','Restriction','Effects','Detail'],filter_column='Type',filter_values=['Active']) | make_skillnames_linkable | convert_to_md_table | add_indentation(spaces=4) }}
 
=== "Skill Source"

    {{ populate_quicklist(file='skills.csv',return_columns=['Name','Inheritable','Source','Potential Source'],filter_column='Type',filter_values=['Active']) | make_skillnames_linkable | convert_to_md_table | add_indentation(spaces=4) }}


## Passive Skills    

=== "Skill Description"

    {{ populate_quicklist(file='skills.csv',return_columns=['Name','Restriction','Inheritable','Effects','Detail'],filter_column='Type',filter_values=['Discipline','Passive']) | make_skillnames_linkable | convert_to_md_table | add_indentation(spaces=4) }}

=== "Skill Source"

    {{ populate_quicklist(file='skills.csv',return_columns=['Name','Inheritable','Source','Potential Source'],filter_column='Type',filter_values=['Discipline','Passive']) | make_skillnames_linkable | convert_to_md_table | add_indentation(spaces=4) }}

## Damage Spells

=== "Spell Description"

    {{ populate_quicklist(file='skills.csv',return_columns=['Name','Inheritable','Restriction','Effects','Detail'],filter_column='Type',filter_values=['Damage']) | make_skillnames_linkable | convert_to_md_table | add_indentation(spaces=4) }}

=== "Spell Source"

    {{ populate_quicklist(file='skills.csv',return_columns=['Name','Inheritable','Source','Potential Source'],filter_column='Type',filter_values=['Damage']) | make_skillnames_linkable | convert_to_md_table | add_indentation(spaces=4) }}

## Heal and Buff Spells

=== "Spell Description"

    {{ populate_quicklist(file='skills.csv',return_columns=['Name','Inheritable','Restriction','Effects','Detail'],filter_column='Type',filter_values=['Support']) | make_skillnames_linkable | convert_to_md_table | add_indentation(spaces=4) }}

=== "Spell Source"

    {{ populate_quicklist(file='skills.csv',return_columns=['Name','Inheritable','Source','Potential Source'],filter_column='Type',filter_values=['Support']) | make_skillnames_linkable | convert_to_md_table | add_indentation(spaces=4) }}

## Debuff Spells

=== "Spell Description"

    {{ populate_quicklist(file='skills.csv',return_columns=['Name','Inheritable','Restriction','Effects','Detail'],filter_column='Type',filter_values=['Debuff']) | make_skillnames_linkable | convert_to_md_table | add_indentation(spaces=4) }}

=== "Spell Source"

    {{ populate_quicklist(file='skills.csv',return_columns=['Name','Inheritable','Source','Potential Source'],filter_column='Type',filter_values=['Debuff']) | make_skillnames_linkable | convert_to_md_table | add_indentation(spaces=4) }}
