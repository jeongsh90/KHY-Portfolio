(function () {
    function initStepper(root) {
        var activeStep = 1;
        var triggers = Array.prototype.slice.call(root.querySelectorAll("[data-step]"));
        var panels = Array.prototype.slice.call(root.querySelectorAll("[data-panel]"));
        var prev = root.querySelector("[data-step-prev]");
        var next = root.querySelector("[data-step-next]");
        var maxStep = triggers.length;

        function setStep(step) {
            activeStep = Math.max(1, Math.min(maxStep, Number(step) || 1));

            triggers.forEach(function (trigger) {
                var isActive = Number(trigger.getAttribute("data-step")) === activeStep;
                trigger.classList.toggle("is-active", isActive);
                if (isActive) trigger.setAttribute("aria-current", "step");
                else trigger.removeAttribute("aria-current");
            });

            panels.forEach(function (panel) {
                panel.classList.toggle("is-active", Number(panel.getAttribute("data-panel")) === activeStep);
            });

            if (prev) prev.disabled = activeStep === 1;
            if (next) next.textContent = activeStep === maxStep ? "완료 보기" : "다음 단계";
        }

        triggers.forEach(function (trigger) {
            trigger.addEventListener("click", function () {
                setStep(trigger.getAttribute("data-step"));
            });
        });

        if (prev) {
            prev.addEventListener("click", function () {
                setStep(activeStep - 1);
            });
        }

        if (next) {
            next.addEventListener("click", function () {
                if (activeStep === maxStep) {
                    var roleMatch = document.querySelector("#role-match");
                    if (roleMatch) roleMatch.scrollIntoView({ behavior: "smooth" });
                    return;
                }
                setStep(activeStep + 1);
            });
        }

        setStep(1);
    }

    document.addEventListener("DOMContentLoaded", function () {
        document.querySelectorAll("[data-stepper]").forEach(initStepper);
    });
})();
