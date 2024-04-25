import json

def json_to_graphviz(json_data):
    # Extract information from JSON
    node = json_data.get("node")
    parent = json_data.get("parent")
    views = json_data.get("views", 0)
    sales = json_data.get("sales", 0)
    he_success_rate = json_data.get("he_success_rate", 0.0)
    
    # Format the high efficiency success rate as percentage
    he_success_rate_percent = f"{he_success_rate * 100:.2f}%"
    
    # Graphviz representation
    graphviz = f"""
graph {{
    fontname="Helvetica"
    node [shape=record, fontname="Helvetica"];
    rankdir=TB;
    splines=false;
    
    "{parent}" [label=<{{
        <B>{parent}</B>|{{|}}|{{--%}}
    }}>, style=filled, fillcolor="#d2d1d1", color="white", fontcolor="white"];
    "{node}" [label=<{{
        <B>{node}</B>|{{{views}|{sales}}}|{{he_success_rate_percent}}}
    }}>;
    
    "{parent}" -- "{node}"
}}
"""
    return graphviz

# Load JSON data from a file
with open('sample.json', 'r') as file:
    json_data = json.load(file)

# Convert JSON to Graphviz format
graphviz_output = json_to_graphviz(json_data)
print(graphviz_output)
