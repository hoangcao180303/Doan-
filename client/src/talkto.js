
{/* <script type="text/javascript">
var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
(function(){
var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
s1.async=true;
s1.src='https://embed.tawk.to/673b413a4304e3196ae47bb6/1icvndjo0';
s1.charset='UTF-8';
s1.setAttribute('crossorigin','*');
s0.parentNode.insertBefore(s1,s0);
})();
</script>
// src/TawkTo.js */}
import React, { useEffect } from 'react';

const TawkTo = () => {
    useEffect(() => {
        // Thay 'your_tawk_id' bằng ID của bạn từ Tawk.to
        const script = document.createElement('script');
        script.src = 'https://embed.tawk.to/673b413a4304e3196ae47bb6/1icvndjo0';
        script.async = true;
        script.charset = 'UTF-8';
        script.setAttribute('crossorigin', '*');
        document.body.appendChild(script);

        return () => {
            // Xóa script khi component bị hủy
            document.body.removeChild(script);
        };
    }, []);

    return null; // Không cần render gì cả
};

export default TawkTo;