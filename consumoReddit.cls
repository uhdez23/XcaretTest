public class consumoReddit {
    public static void llamadaServicio() {
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        String url;
        url = getEndPoint('Reddit');
        url = url +'?sort=new';
        request.setEndpoint(url);
        request.setMethod('GET');
        HttpResponse response = http.send(request);
        // If the request is successful, parse the JSON response.
        if(response.getStatusCode() == 200) {
            // Deserialize the JSON string into collections of primitive data types.
            Map<String, Object> results = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());
            System.debug('results:::'+results);
            Map<String, Object> data = (Map<String, Object>) results.get('data');
            System.debug('data:::'+data);
            List<Object> children = (List<Object>) data.get('children');
            System.debug('children:::'+children);
            insertData(children);
        }
    }

    public static String getEndPoint(String nameIntegration){
        String url;
        try {
            Integraciones__mdt datos = [
                SELECT developerName, Resource__c
                FROM Integraciones__mdt
                WHERE developerName = :nameIntegration
            ];
            url = datos.Resource__c;
        } catch (Exception e) {
            System.debug('Error:::'+e.getMessage());
        }
        return url;
    }

    public static void insertData(List<Object> children){
        try {
            List<reddit_item__c> listItem = new List<reddit_item__c>();
            for(Object item : children){
                Map<String, Object> dataNode = (Map<String, Object>)((Map<String, Object>)item).get('data');
                //System.debug('dataNode:::'+dataNode);
                reddit_item__c newRecord = new reddit_item__c();
                newRecord.title__c = String.valueOf(dataNode.get('title'));
                newRecord.thumbnail__c = String.valueOf(dataNode.get('thumbnail'));
                newRecord.selftext__c = String.valueOf(dataNode.get('selftext'));
                newRecord.author_fullname__c = String.valueOf(dataNode.get('author_fullname'));
                newRecord.id_Reddit__c = String.valueOf(dataNode.get('id'));
                listItem.add(newRecord);
            }
            System.debug('size: '+listItem.size()+'listItem:::'+listItem);
            insert listItem;
        } catch (Exception e) {
            System.debug('Error:::'+e.getMessage());
        }
        
    }
}