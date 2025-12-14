import React, { useEffect } from 'react';

const TAWK_PROPERTY_ID = '693c6318dfff06197e00a7fb';
const TAWK_WIDGET_ID = '1jc9u66cs';

const ChatWidget = () => {
    useEffect(() => {
        if (document.getElementById('tawk-to-script')) return;

        window.Tawk_API = window.Tawk_API || {};
        window.Tawk_LoadStart = new Date();

        (function () {
            var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
            s1.async = true;
            s1.src = `https://embed.tawk.to/${TAWK_PROPERTY_ID}/${TAWK_WIDGET_ID}`;
            s1.charset = 'UTF-8';
            s1.setAttribute('crossorigin', '*');
            s1.id = 'tawk-to-script';
            s0.parentNode.insertBefore(s1, s0);
        })();

        return () => {
        };
    }, []);

    if (TAWK_PROPERTY_ID === 'YOUR_PROPERTY_ID') {
        console.warn('Tawk.to Chat Widget: Please set your Property ID in src/components/ChatWidget.js');
        return null;
    }

    return null;
};

export default ChatWidget;
