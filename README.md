

# Description

## Objective

* Ability to consume API and render collections as row on screen
* Ability to use remote control style to navigate between each tile
* Focus tile should be scaled up and have clear indicator
* Ability to interact with selected tile with modal and show detail
* Ability to render data on demand
* Ability to switch theme with oriented tiles
* Ability to show watermarks

## Design

To make the app testable and extendable, the first thing I am looking for is deconstruction. 

### Component Structure
  * Main Container
    * Collection Wrapper
      * Collection Header
      * Scrollable Wrapper
        * Tile
          * Card
          * Title
          * Summary
          * Description (Show only when focuse)

### Issue and solution  

#### Lazy Loading
* Load only when needed
  * Load by id when collection scroll in view, including use navigation to nav to unloaded row
  * Stop watching scroll in view event
  * Cache loaded data after successful load to avoid unnecessary call
      
#### Image Loading Issue
* Issue
  * Image not available
    * Large size image not available (Modal)
  * Solution
    * Display default image (logo) ==> Can be static
    * Downgrade to smaller size when large size is not available, if still not available display default image
    * 

#### Watermark and theme support
* watermark and image will be used in both main page and modal, can be general
* Theme is part of the general setting, put theme in setting
  * add sticky setting header
  * when theme switch, rerender necessary components and avoid fetching data
  * ability to extend setting with more featuers


#### Navigation
* Issue 1
  * Need to nav to the corresponding positioon in different row
* Solution
  * Calculate the position in view from current row
  * Calculate the index of the tile in next row
    * get the position of the first tile in view from next row
    * add by the position view from current row
* Issue 2
  * Need seperate handler for settings 

     
# Step to run build file 
## Source Code:
https://github.com/tliang03/hulu_assignment_jasmine.git

## Live Demo:
https://tliang03.github.io/hulu_assignment_jasmine/
  
# Step to run from local
* git clone [repo](https://github.com/tliang03/hulu_assignment_jasmine.git)
* npm install
* npm run start

# Step to run unit test
* git clone repo
* npm install
* npm run test

