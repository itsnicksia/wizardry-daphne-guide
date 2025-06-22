# Skills and Spells

## Active Skills

=== "Skill Description"

    {{ populate_quicklist(file='skills.csv',return_columns=['Name','Restriction','Effects','Detail'],filter_column='Type',filter_values=['active']) | convert_to_md_table | add_indentation(spaces=4) }}

=== "Skill Source"

    {{ populate_quicklist(file='skills.csv',return_columns=['Name','Source','Potential Source'],filter_column='Type',filter_values=['active']) | convert_to_md_table | add_indentation(spaces=4) }}


## Passive Skills    

=== "Skill Description"

    {{ populate_quicklist(file='skills.csv',return_columns=['Name','Restriction','Type','Effects','Detail'],filter_column='Type',filter_values=['Discipline','Inheritable','Non-Inheritable']) | convert_to_md_table | add_indentation(spaces=4) }}

=== "Skill Source"

    {{ populate_quicklist(file='skills.csv',return_columns=['Name','Source','Type','Potential Source'],filter_column='Type',filter_values=['Discipline','Inheritable','Non-Inheritable']) | convert_to_md_table | add_indentation(spaces=4) }}

## Damage Spells

=== "Spell Description"

    {{ populate_quicklist(file='skills.csv',return_columns=['Name','Restriction','Effects','Detail'],filter_column='Type',filter_values=['damage']) | convert_to_md_table | add_indentation(spaces=4) }}

=== "Spell Source"

    {{ populate_quicklist(file='skills.csv',return_columns=['Name','Source','Potential Source'],filter_column='Type',filter_values=['damage']) | convert_to_md_table | add_indentation(spaces=4) }}

## Heal and Buff Spells

=== "Spell Description"

    {{ populate_quicklist(file='skills.csv',return_columns=['Name','Restriction','Effects','Detail'],filter_column='Type',filter_values=['support']) | convert_to_md_table | add_indentation(spaces=4) }}

=== "Spell Source"

    {{ populate_quicklist(file='skills.csv',return_columns=['Name','Source','Potential Source'],filter_column='Type',filter_values=['support']) | convert_to_md_table | add_indentation(spaces=4) }}

## Debuff Spells

=== "Spell Description"

    {{ populate_quicklist(file='skills.csv',return_columns=['Name','Restriction','Effects','Detail'],filter_column='Type',filter_values=['debuff']) | convert_to_md_table | add_indentation(spaces=4) }}

=== "Spell Source"

    {{ populate_quicklist(file='skills.csv',return_columns=['Name','Source','Potential Source'],filter_column='Type',filter_values=['debuff']) | convert_to_md_table | add_indentation(spaces=4) }}