# List of Skills per Class

[List of Skill Descriptions](./skills-and-spells.md)

=== "Fighter Skills"
    {{ populate_quicklist(file='skills.csv',return_columns=['Name','Type','Level'],filter_column='Class',filter_values=['Fighter']) | convert_to_md_table | add_indentation(spaces=4) }}

=== "Knight Skills"
    {{ populate_quicklist(file='skills.csv',return_columns=['Name','Type','Level'],filter_column='Class',filter_values=['Knight']) | convert_to_md_table | add_indentation(spaces=4) }}

=== "Thief Skills"
    {{ populate_quicklist(file='skills.csv',return_columns=['Name','Type','Level'],filter_column='Class',filter_values=['Thief']) | convert_to_md_table | add_indentation(spaces=4) }}

=== "Priest Skills"
    {{ populate_quicklist(file='skills.csv',return_columns=['Name','Type','Level'],filter_column='Class',filter_values=['Priest']) | convert_to_md_table | add_indentation(spaces=4) }}

=== "Mage Skills"
    {{ populate_quicklist(file='skills.csv',return_columns=['Name','Type','Level'],filter_column='Class',filter_values=['Mage']) | convert_to_md_table | add_indentation(spaces=4) }}

=== "Ninja Skills"
    {{ populate_quicklist(file='skills.csv',return_columns=['Name','Type','Level'],filter_column='Class',filter_values=['Ninja']) | convert_to_md_table | add_indentation(spaces=4) }}

=== "Samurai Skills"
    {{ populate_quicklist(file='skills.csv',return_columns=['Name','Type','Level'],filter_column='Class',filter_values=['Samurai']) | convert_to_md_table | add_indentation(spaces=4) }}