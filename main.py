import pandas as pd

def define_env(env):

    from mkdocs_table_reader_plugin.readers import pd_read_csv

    @env.macro
    def get_skill_description(skill_name):
        
        skill = pd.DataFrame(pd_read_csv('data/skills.csv').query(f'Name == "{skill_name}"'))
        
        effect = skill['Effects'].iloc[0]
        details = skill['Detail'].fillna('').iloc[0]
        
        return f"{effect} {details}"
    
    @env.macro
    def populate_quicklist(file,return_columns,filter_column=None,filter_values=[]):

        results = pd_read_csv(f'./data/{file}')
        if filter_column != None and filter_values:
            results = results.query(f'`{filter_column}` in {filter_values}')
        results = results.fillna('')

        # Only linkify names if file is adventurers.csv and required fields exist
        if file == 'adventurers.csv' and 'Name' in return_columns and 'Rarity' in results.columns:
            def linkify(row):
                name = row['Name']
                rarity = row['Rarity'].strip().lower()
                if rarity == "anonymous":
                    return name  # Don't linkify anonymous
                name_slug = name.replace(' ', '-')
                return f"[{name}](./{rarity}-adventurers/details/{name_slug}.md)"

            results['Name'] = results.apply(linkify, axis=1)

        return results[return_columns]