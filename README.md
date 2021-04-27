# DBML Docs
A Standalone Site for Displaying Database Documentation Based on DBML Files

### How to Use
1. Replace Example.dbml in the ```public/Database``` folder with your dbml file. 
2. change the DatabaseName field in ```src/config.json``` to the name of your dbml file.
3. Run ```npm start```

### Supported Features
| Feature               | Supported               | Notes                                |
|:---------------------:|:-----------------------:|:------------------------------------:|
| Project Definition    | :heavy_check_mark:      |                                      |
| Table Definition      | :heavy_check_mark:      |                                      |
| Table Alias           | :x:                     |                                      |
| Table Notes           | :heavy_check_mark:      |                                      |
| Table Settings        | :x:                     | Not Yet Supported By DBML Standard   |
| Column Definition     | :heavy_check_mark:      |                                      |
| Default Value         | :heavy_check_mark:      |                                      |
| Index Definition      | :x:                     |                                      |
| Index Settings        | :x:                     |                                      |
| Relationships         | :ballot_box_with_check: | One to One Definitions Not Supported |
| Relationship Settings | :x:                     |                                      |
| Note Definition       | :heavy_check_mark:      | Full Mardown Support of Project Note |
| Enum Definition       | :x:                     |                                      |
| Table Groups          | :x:                     |                                      |

[DBML Documentation](https://www.dbml.org/docs)