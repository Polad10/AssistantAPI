��- -   C r e a t e T a b l e 
 
 C R E A T E   T A B L E   " a p p o i n t m e n t "   ( 
 
         " i d "   S E R I A L   N O T   N U L L , 
 
         " d a t e t i m e "   T I M E S T A M P T Z ( 6 )   N O T   N U L L , 
 
         " a c t i o n s "   T E X T , 
 
         " t r e a t m e n t _ i d "   I N T E G E R   N O T   N U L L , 
 
 
 
         C O N S T R A I N T   " a p p o i n t m e n t _ p k "   P R I M A R Y   K E Y   ( " i d " ) 
 
 ) ; 
 
 
 
 - -   C r e a t e T a b l e 
 
 C R E A T E   T A B L E   " p a t i e n t "   ( 
 
         " f i r s t _ n a m e "   V A R C H A R   N O T   N U L L , 
 
         " l a s t _ n a m e "   V A R C H A R   N O T   N U L L , 
 
         " c i t y "   V A R C H A R , 
 
         " p h o n e "   V A R C H A R , 
 
         " e x t r a _ i n f o "   T E X T , 
 
         " i d "   S E R I A L   N O T   N U L L , 
 
 
 
         C O N S T R A I N T   " p a t i e n t _ p k "   P R I M A R Y   K E Y   ( " i d " ) 
 
 ) ; 
 
 
 
 - -   C r e a t e T a b l e 
 
 C R E A T E   T A B L E   " p a y m e n t "   ( 
 
         " i d "   S E R I A L   N O T   N U L L , 
 
         " d a t e "   D A T E   N O T   N U L L , 
 
         " a m o u n t "   D E C I M A L ( 1 0 , 2 )   N O T   N U L L , 
 
         " t r e a t m e n t _ i d "   I N T E G E R   N O T   N U L L , 
 
 
 
         C O N S T R A I N T   " p a y m e n t _ p k "   P R I M A R Y   K E Y   ( " i d " ) 
 
 ) ; 
 
 
 
 - -   C r e a t e T a b l e 
 
 C R E A T E   T A B L E   " t r e a t m e n t "   ( 
 
         " i d "   S E R I A L   N O T   N U L L , 
 
         " s t a r t _ d a t e "   D A T E   N O T   N U L L , 
 
         " t i t l e "   V A R C H A R   N O T   N U L L , 
 
         " p a t i e n t _ i d "   I N T E G E R   N O T   N U L L , 
 
         " f i n i s h e d "   B O O L E A N   N O T   N U L L   D E F A U L T   f a l s e , 
 
 
 
         C O N S T R A I N T   " t r e a t m e n t _ p k "   P R I M A R Y   K E Y   ( " i d " ) 
 
 ) ; 
 
 
 
 - -   A d d F o r e i g n K e y 
 
 A L T E R   T A B L E   " a p p o i n t m e n t "   A D D   C O N S T R A I N T   " a p p o i n t m e n t _ f k "   F O R E I G N   K E Y   ( " t r e a t m e n t _ i d " )   R E F E R E N C E S   " t r e a t m e n t " ( " i d " )   O N   D E L E T E   N O   A C T I O N   O N   U P D A T E   N O   A C T I O N ; 
 
 
 
 - -   A d d F o r e i g n K e y 
 
 A L T E R   T A B L E   " p a y m e n t "   A D D   C O N S T R A I N T   " p a y m e n t _ f k "   F O R E I G N   K E Y   ( " t r e a t m e n t _ i d " )   R E F E R E N C E S   " t r e a t m e n t " ( " i d " )   O N   D E L E T E   N O   A C T I O N   O N   U P D A T E   N O   A C T I O N ; 
 
 
 
 - -   A d d F o r e i g n K e y 
 
 A L T E R   T A B L E   " t r e a t m e n t "   A D D   C O N S T R A I N T   " t r e a t m e n t _ f k "   F O R E I G N   K E Y   ( " p a t i e n t _ i d " )   R E F E R E N C E S   " p a t i e n t " ( " i d " )   O N   D E L E T E   N O   A C T I O N   O N   U P D A T E   N O   A C T I O N ; 
 
 
 
 