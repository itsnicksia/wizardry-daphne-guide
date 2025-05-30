import pandas as pd

def define_env(env):

    from mkdocs_table_reader_plugin.readers import pd_read_csv

    @env.macro
    def get_skill_description(skill_name):
        
        skill = pd.DataFrame(pd_read_csv('data/skills.csv').query(f'name == "{skill_name}"'))
        
        effect = skill['effect'].iloc[0]
        details = skill['details'].fillna('').iloc[0]
        
        return f"{effect} {details}"