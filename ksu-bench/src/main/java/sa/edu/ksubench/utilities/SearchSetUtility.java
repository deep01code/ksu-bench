package sa.edu.ksubench.utilities;


import java.util.*;

public class SearchSetUtility<T> {


    public int getElementPositionBasedOnID(Set<T> set, T key ){

        List<T> list=new ArrayList<>();
        list.addAll(set);
        final Object o = key;
        Comparator<T> comparator = new Comparator<T>() {
            public int compare(T a1, T a2)
            {
                int result=0;
                try {
                    Long id1=(Long)a1.getClass().getField("id").get(a1);
                    Long id2=(Long)a2.getClass().getField("id").get(a2);
                    result= id1.compareTo(id2);
                } catch (NoSuchFieldException | IllegalAccessException e) {
                    e.printStackTrace();
                }
                return result;
            }
        };

        int position= Collections.binarySearch(list, key,comparator);

        return position;
    }


    public int getElementPosition(Set<T> set, T key ,Comparator<T> comparator){

        List<T> list=new ArrayList<>();
        list.addAll(set);
        int position= Collections.binarySearch(list, key,comparator);
        return position;
    }
}
