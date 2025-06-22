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
        if filter_column != None and not filter_values:
            results = results.query(f'`{filter_column}` in {filter_values}')
        results = results.fillna('')

        return results[return_columns]