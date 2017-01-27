define(["idb"],function(){"use strict";function setup(){dbPromise=idb.open(dbName,dbVersion,function(upgradeDB){switch(upgradeDB.oldVersion){case 0:upgradeDB.createObjectStore(dbName)}})}function getServerItemIds(serverId){return dbPromise.then(function(db){return db.transaction(dbName).objectStore(dbName).getAll(null,1e4).then(function(all){return all.filter(function(item){return item.ServerId===serverId}).map(function(item2){return item2.ItemId})})})}function getServerItemTypes(serverId,userId){return dbPromise.then(function(db){return db.transaction(dbName).objectStore(dbName).getAll(null,1e4).then(function(all){return all.filter(function(item){return item.ServerId===serverId&&(null==item.UserIdsWithAccess||item.UserIdsWithAccess.contains(userId))}).map(function(item2){return(item2.Item.Type||"").toLowerCase()}).filter(filterDistinct)})})}function getServerIds(serverId){return dbPromise.then(function(db){return db.transaction(dbName).objectStore(dbName).getAll(null,1e4).then(function(all){return all.filter(function(item){return item.ServerId===serverId}).map(function(item2){return item2.Id})})})}function getAll(){return dbPromise.then(function(db){return db.transaction(dbName).objectStore(dbName).getAll(null,1e4)})}function get(key){return dbPromise.then(function(db){return db.transaction(dbName).objectStore(dbName).get(key)})}function set(key,val){return dbPromise.then(function(db){var tx=db.transaction(dbName,"readwrite");return tx.objectStore(dbName).put(val,key),tx.complete})}function remove(key){return dbPromise.then(function(db){var tx=db.transaction(dbName,"readwrite");return tx.objectStore(dbName).delete(key),tx.complete})}function clear(){return dbPromise.then(function(db){var tx=db.transaction(dbName,"readwrite");return tx.objectStore(dbName).clear(),tx.complete})}function filterDistinct(value,index,self){return self.indexOf(value)===index}var dbPromise,dbName="items",dbVersion=1;return setup(),{get:get,set:set,remove:remove,clear:clear,getAll:getAll,getServerItemIds:getServerItemIds,getServerIds:getServerIds,getServerItemTypes:getServerItemTypes}});