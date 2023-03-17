public class dataTableRedditController {
    @AuraEnabled
    public static List<reddit_item__c> getItems() {
        List<reddit_item__c> items = [
            SELECT Id, title__c, thumbnail__c, selftext__c, id_Reddit__c, author_fullname__c, lastModifiedDate 
            FROM reddit_item__c
        ];
        return items;
    }

    @AuraEnabled
    public static String deleteItem(String idItem) {
        String status;
        try {
            List<reddit_item__c> items = [
                SELECT Id
                FROM reddit_item__c
                WHERE Id = :idItem
            ];
            delete items;
            status = 'Registro eliminado';
        } catch (Exception e) {
            System.debug('Error:::'+e.getMessage());
            status = 'Error:::'+e.getMessage();
        }
        return status;
    }
}