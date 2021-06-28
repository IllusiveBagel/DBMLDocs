# DBML Docs
A React based standalone site for generating documentation based on a DBML file. The purpose of this project is to allow the automatic generation of a documentation site for your database and allow you to host that site yourself keeping all of your data and documentation in house.

[Live Demo (Coming Soon)]()

### How to Use
1. Clone Repo
```
git clone https://github.com/IllusiveBagel/DBMLDocs.git
```
2. Install Dependencies
```
yarn install
```
3. Replace Example.dbml in the ```public/Database``` folder with your dbml file. 
4. change the DatabaseName field in ```src/config.json``` to the name of your dbml file.
5. Start the Site
```
yarn start
```

### Supported Features
| Feature               | Supported               | Notes                                |
|:---------------------:|:-----------------------:|:------------------------------------:|
| Project Definition    | :heavy_check_mark:      |                                      |
| Table Definition      | :heavy_check_mark:      |                                      |
| Table Alias           | :heavy_check_mark:      |                                      |
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

### About Example.dbml
The Example file that deploys with the code includes all of the supported features and can be used to give a good display of how DBMLDocs works.

Currently included in the Example is 2 tables with a simple reference connecting the two tables. This file will be updated with the project to display all functionality.