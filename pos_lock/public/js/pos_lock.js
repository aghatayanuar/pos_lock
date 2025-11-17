(() => {
    frappe.router.on("change", () => {

        if (frappe.get_route()[0] === "point-of-sale") {

            const LOCK_KEY = "pos_lock";

            if (localStorage.getItem(LOCK_KEY)) {

                let d = new frappe.ui.Dialog({
                    title: "POS Sudah Terbuka",
                    indicator: "red",
                    static: true,
                    fields: [
                        {
                            fieldtype: "HTML",
                            options: "<p>POS sedang dibuka di tab lain. Tutup tab tersebut dulu.</p>"
                        }
                    ],
                    primary_action_label: "OK",
                    primary_action: () => {
                        d.hide();
                        frappe.set_route("app");
                    }
                });

                d.show();
                return;
            }

            localStorage.setItem(LOCK_KEY, "1");

            window.addEventListener("beforeunload", () => {
                localStorage.removeItem(LOCK_KEY);
            });
        }

    });
})();
